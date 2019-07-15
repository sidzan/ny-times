import autobind from "autobind-decorator";
import {call, CallEffect, ForkEffect, put, PutEffect, select, takeLatest, delay} from "redux-saga/effects";
import {getType} from "typesafe-actions";
import {URLS} from "../../constants/URLS";
import {getArticles} from "../../redux/modules/Articles/articlesActionCretors";
import {Api} from "../../sdk/Api";
import {IArticles, IResponse} from "../../sdk/Interface/Article";
import {getSort, getSearchKey} from "../../selectors/ArticlesSelectors";
import {BaseSaga} from "../BaseSaga";

const restructurePayload = (response: IResponse): IResponse => {
    response.docs = response.docs.map((doc) => {
        if (doc.multimedia.length === 0) {
            doc.hasImage = false;
            return doc;
        }
        doc.hasImage = true;
        doc.thumbnail = URLS.image + doc.multimedia.filter(d => d.subType === "xlarge").map(d => d.url);
        doc.image = URLS.image + doc.multimedia.filter(d => d.subType === "thumbLarge").map(d => d.url);
        return doc;
    });
    return response;
};

export class ArticlesSaga extends BaseSaga {
    constructor(api: Api) {
        super(api);
    }

    @autobind
    public* fetchArticles(): IterableIterator<CallEffect | PutEffect<any>> {
        try {
            // @ts-ignore
            const sort = yield select(getSort);
            yield put(getArticles.setPending(null));
            const payload: IArticles = yield call(this.api.articles.getArticles, sort);
            const restructuredPayload = restructurePayload(payload.response);
            yield put(getArticles.setFulfilled(restructuredPayload));
        } catch (e) {
            yield put(getArticles.setRejected(null, e.toString()));
        }
    }

    @autobind
    public* searchArticles(): IterableIterator<CallEffect | PutEffect<any>> {
        try {
            yield delay(500); // debounce simulator
            // @ts-ignore
            const sort = yield select(getSort);
            // @ts-ignore
            const searchKey = yield select(getSearchKey);
            yield put(getArticles.setPending(null));
            const payload: IArticles = yield call(this.api.articles.getArticles, sort, searchKey);
            const restructuredPayload = restructurePayload(payload.response);
            yield put(getArticles.setFulfilled(restructuredPayload));
        } catch (e) {
            yield put(getArticles.setRejected(null, e.toString()));
        }
    }

    protected* registerListeners(): IterableIterator<ForkEffect> {
        yield takeLatest(getType(getArticles.invoke), this.fetchArticles)
        yield takeLatest("ARTICLES/CLEAR_SEARCH", this.fetchArticles);
        yield takeLatest("ARTICLES/SEARCH", this.searchArticles);
        yield takeLatest("ARTICLES/SORT", this.searchArticles);
    }
}
