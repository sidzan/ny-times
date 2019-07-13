import {IResponse} from "../../../sdk/Interface/Article";
import {createAsyncActions} from "../baseModule";

export interface IRequestOptions {
    sort?: "newest" | "oldest"
}

// tslint:disable-next-line:export-name
export const getArticles = createAsyncActions(
    "ARTICLES/GET",
    "ARTICLES/GET_PENDING",
    "ARTICLES/GET_FULFILLED",
    "ARTICLES/GET_REJECTED"
)<IRequestOptions, null, IResponse, null>();
