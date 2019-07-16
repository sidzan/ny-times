import {RouterState} from "redux-router5";
import {IArticlesState} from "./modules/Articles/articlesModule";
import {ICounterState} from "./modules/counterModule";

export interface IStore {
    articles: IArticlesState;
    counter: ICounterState;
    router: RouterState;
}
