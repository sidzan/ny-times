import {IFetchRequest, Service} from "@crazyfactory/tinka";
import autobind from "autobind-decorator";
import {IArticles} from "../Interface/Article";

export class Articles extends Service {
    @autobind
    public getArticles(sort: string = "newest", search?: string): Promise<IArticles> {
        let url = `&sort=${sort}`;
        if (search) {
            url += `&q=${encodeURIComponent(search)}`;
        }
        const request: IFetchRequest = {
            url
        };
        return this.client.process(request);
    }

}
