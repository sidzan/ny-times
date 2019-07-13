import autobind from "autobind-decorator";
import {call, CallEffect, ForkEffect, put, PutEffect, takeLatest} from "redux-saga/effects";
import {getType} from "typesafe-actions";
import {getArticles} from "../../redux/modules/Articles/articlesActionCretors";
import {Api} from "../../sdk/Api";
import {IArticles} from "../../sdk/Interface/Article";
import {BaseSaga} from "../BaseSaga";

export class ArticlesSaga extends BaseSaga {
    constructor(api: Api) {
        super(api);
    }

    @autobind
    public* fetchArticles(): IterableIterator<CallEffect | PutEffect<any>> {
        try {
            yield put(getArticles.setPending(null));
            const payload: IArticles = yield call(this.api.articles.getArticles);
            yield put(getArticles.setFulfilled(payload.response));
        } catch (e) {
            yield put(getArticles.setRejected(null, e.toString()));
        }
    }

    protected* registerListeners(): IterableIterator<ForkEffect> {
        yield takeLatest(getType(getArticles.invoke), this.fetchArticles);
    }
}
