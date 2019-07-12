import {Client, IFetchHeaders, IFetchRequest, IncludeCredentialsMiddleware, Service,} from "@crazyfactory/tinka";
import {ContentTypeMiddleware} from "./middlewares/ContentTypeMiddleware";
import {WrapMiddleware} from "./middlewares/WrapMiddleware";

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
        return "https://api.nytimes.com"; //tslint:disable-line
    }

    private static setupMiddlewares(client: Client): Client {
        client.addMiddleware(new WrapMiddleware());
        client.addMiddleware(new ContentTypeMiddleware());
        client.addMiddleware(new IncludeCredentialsMiddleware("omit"));
        return client;
    }
}
