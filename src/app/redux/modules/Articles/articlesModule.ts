import {ActionType, getType} from "typesafe-actions";
import {IResponse} from "../../../sdk/Interface/Article";
import {IBaseState} from "../baseModule";
import * as articlesActionCreators from "./articlesActionCretors";

export interface IArticlesState extends IBaseState {
    data?: IResponse;
}

const initialState: IArticlesState = {
    data: {
        docs: []
    },
    error: "",
    loaded: false,
    pending: false
};

export function articlesReducer(
    state: IArticlesState = initialState,
    action: ActionType<typeof articlesActionCreators>
): IArticlesState {
    switch (action.type) {
        case getType(articlesActionCreators.getArticles.setPending):
            return {
                ...state,
                data: null,
                pending: true
            };
        case getType(articlesActionCreators.getArticles.setFulfilled):
            return {
                ...state,
                data: action.payload,
                error: "",
                loaded: true,
                pending: false
            };
        case getType(articlesActionCreators.getArticles.setRejected):
            return {
                ...state,
                error: action.message,
                loaded: true,
                pending: false
            };
        default:
            return state;
    }
}
