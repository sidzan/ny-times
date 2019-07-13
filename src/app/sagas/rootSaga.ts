import {all, AllEffect} from "redux-saga/effects";
import {Api} from "../sdk/Api";
import {ArticlesSaga} from "./modules/articles";

export default function* rootSaga(): IterableIterator<AllEffect<any>> {
    const api = Api.getInstance();

    yield all([
                  (new ArticlesSaga(api)).watch()
              ])
    ;
}
