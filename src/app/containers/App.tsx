import * as React from "react";
import Helmet from "react-helmet";
import {connect} from "react-redux";
import {createRouteNodeSelector, RouterState} from "redux-router5";
import {State as IRouteState} from "router5/create-router";
import {stylesheet} from "typestyle";
import {config as appConfig} from "../../../config";
import {setupCss} from "../helpers/setupCss";
import {Details} from "../pages/Details";
import {HomePage} from "../pages/HomePage";
import {IStore} from "../redux/IStore";
import {CounterPage} from "./CounterPage";
import {Navbar} from "./Navbar";

interface IStateToProps {
    route: IRouteState;
}

setupCss("en"); // Set by default

const classNames = stylesheet({
                                  container: {
                                      margin: 0,
                                      padding: 0,
                                      textAlign: "center"
                                  }
                              });

class App extends React.Component<IStateToProps> {
    private components: { [key: string]: React.ComponentClass } = {
        home: HomePage,
        counter: CounterPage,
        details: Details
    };

    public render(): JSX.Element {
        const {route} = this.props;
        const segment = route ? route.name.split(".")[0] : undefined;
        return (
            <section className={classNames.container}>
                <Helmet {...appConfig.app.head}/>
                <Navbar/>
                {segment && this.components[segment] ? React.createElement(this.components[segment]) : <div>404</div>}
            </section>
        );
    }
}

const mapStateToProps = (state: Pick<IStore, "router">): IStateToProps & Partial<RouterState> => ({
    ...createRouteNodeSelector("")(state)
});

const connected = connect(mapStateToProps)(App);

export {classNames, connected as App, mapStateToProps};
