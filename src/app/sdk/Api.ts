import {Client, IFetchHeaders, IFetchRequest, Service} from "@crazyfactory/tinka";
import {ContentTypeMiddleware} from "./middlewares/ContentTypeMiddleware";
import {WrapMiddleware} from "./middlewares/WrapMiddleware";
import {Articles} from "./modules/Articles";

// tslint:disable-next-line
export class Api extends Service {
    private static instances: { [key: string]: Api } = {};

    public static getInstance(endpoint: string = Api.getEndpoint()): Api {
        if (!Api.instances[endpoint]) {
            Api.instances[endpoint] = new Api(Api.setupMiddlewares(Api.getClient(endpoint)));
        }
        return Api.instances[endpoint];
    }

    public static getClient(baseUrl: string): Client {
        const headers: IFetchHeaders = {
            authorization: ""
        };
        const request: IFetchRequest = {baseUrl, headers};
        return new Client(request);
    }

    public static getEndpoint(): any {
        // tslint:disable-next-line
        return "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d7nQQhYX5fsndjScSGB4ZwFnVxzSLOeA"; //tslint:disable-line
    }

    public get articles(): Articles {
        return new Articles(this.client);
    }

    private static setupMiddlewares(client: Client): Client {
        client.addMiddleware(new WrapMiddleware());
        client.addMiddleware(new ContentTypeMiddleware());
        return client;
    }
}
