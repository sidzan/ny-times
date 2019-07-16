import {createAction} from "typesafe-actions";
import {IResponse} from "../../../sdk/Interface/Article";
import {createAsyncActions} from "../baseModule";

// tslint:disable-next-line:export-name
export const getArticles = createAsyncActions(
    "ARTICLES/GET",
    "ARTICLES/GET_PENDING",
    "ARTICLES/GET_FULFILLED",
    "ARTICLES/GET_REJECTED"
)<string, null, IResponse, null>();

export const sortArticles = createAction("ARTICLES/SORT", (resolve) => {
    return (payload: "newest" | "oldest") => {
        return resolve(payload);
    };
});

export const clearSearchFilterArticles = createAction("ARTICLES/CLEAR_SEARCH", (resolve) => {
    return () => resolve();
});

export const searchFilters = createAction("ARTICLES/SEARCH", (resolve) => {
    return (searchQuery: string) => resolve(searchQuery);
});
