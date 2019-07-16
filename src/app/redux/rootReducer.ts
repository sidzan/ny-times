import {combineReducers, Reducer} from "redux";
import {router5Reducer} from "redux-router5";
import {IStore} from "./IStore";
import {articlesReducer} from "./modules/Articles/articlesModule";
import {counterReducer} from "./modules/counterModule";

const rootReducer: Reducer<IStore> = combineReducers<IStore>(
    {
        articles: articlesReducer,
        counter: counterReducer,
        router: router5Reducer
    });

export default rootReducer;
