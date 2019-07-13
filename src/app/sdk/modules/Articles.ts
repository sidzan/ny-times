import {IFetchRequest, Service} from "@crazyfactory/tinka";
import autobind from "autobind-decorator";
import {IArticles} from "../Interface/Article";

export class Articles extends Service {
    @autobind
    public getArticles(sort: string = "newest"): Promise<IArticles> {
        const request: IFetchRequest = {
            url: `&sort=${sort}`
        };
        return this.client.process(request);
    }

}
