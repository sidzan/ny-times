import Chalk from "chalk";
import * as e6p from "es6-promise";
import * as express from "express";
import "isomorphic-fetch";
import * as path from "path";
import * as React from "react";
import {renderToString} from "react-dom/server";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router5";
import {config as appConfig} from "../config";
import {App} from "./app/containers/App";
import {Html} from "./app/containers/Html";
import {configureStore} from "./app/redux/configureStore";
import {IStore} from "./app/redux/IStore";
import {configureRouter} from "./app/routes/configureRouter";
import rootSaga from "./app/sagas/rootSaga";

(e6p as any).polyfill();

const app = express();

if (process.env.NODE_ENV !== "production") {
    const webpack = require("webpack");
    const webpackConfig = require("../config/webpack/dev");
    const webpackCompiler = webpack(webpackConfig);

    app.use(require("webpack-dev-middleware")(webpackCompiler, {
        lazy: false,
        logLevel: "info",
        publicPath: webpackConfig.output.publicPath,
        stats: {colors: true}
    }));

    app.use(require("webpack-hot-middleware")(webpackCompiler));
}

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("*", (req: express.Request, res: express.Response) => {
    // tslint:disable-next-line:no-console
    if (!appConfig.ssr) {
        res.sendFile(path.resolve("./build/index.html"), {}, (error) => {
            if (error) {
                console.error(error.message);
            }
        });
        return;
    }

    const router = configureRouter();
    router.start(req.url, (error, routeState) => {
        if (error) {
            res.status(500).send(error.message);
            return;
        }

        const store = configureStore(router, {
            router: {
                previousRoute: null,
                route: routeState,
                transitionError: null,
                transitionRoute: null
            }
        });

        store.runSaga(rootSaga).toPromise().then(() => {
            // deep clone state because store will be changed during the second render in constructor
            const initialState = JSON.parse(JSON.stringify(store.getState()));

            // tslint:disable-next-line
            console.time("second render");

            // render again from the initial data
            const markup = renderToString(
                <Provider store={store} key="provider">
                    <RouterProvider router={router}>
                        <App/>
                    </RouterProvider>
                </Provider>
            );

            // tslint:disable-next-line
            console.timeEnd("second render");

            res.status(200).send(renderHTML(markup, initialState));

        }).catch((err: any) => {
            console.error(err.message);
            res.status(500).send(err.message);
        });

        // tslint:disable-next-line
        console.time("first render");

        // first render to activate constructor to dispatch actions for loading initial data
        renderToString(
            <Provider store={store} key="provider">
                <RouterProvider router={router}>
                    <App/>
                </RouterProvider>
            </Provider>
        );

        // tslint:disable-next-line
        console.timeEnd("first render");

        // dispatching END will cause the root saga to terminate after all fired tasks terminate
        store.close();
    });
});

app.listen(appConfig.port, appConfig.host, (err) => {
    if (err) {
        console.error(Chalk.bgRed(err));
    } else {
        console.info(Chalk.black.bgGreen(
            `\n\n💂  Listening at http://${appConfig.host}:${appConfig.port}\n`
        ));
    }
});

function renderHTML(markup: string, initialState: Partial<IStore>): string {
    const manifest = require("../build/manifest.json");
    const html = renderToString(
        <Html markup={markup} manifest={manifest} initialState={initialState}/>
    );
    return `<!doctype html> ${html}`;
}
