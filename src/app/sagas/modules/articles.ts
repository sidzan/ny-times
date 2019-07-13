import autobind from "autobind-decorator";
import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { getArticles } from "../../redux/modules/Articles/articlesActionCretors";
import { Api } from "../../sdk/Api";
import { IArticles, IResponse } from "../../sdk/Interface/Article";
import { BaseSaga } from "../BaseSaga";

const restructurePayload = (response: IResponse): IResponse => {
    response.docs = response.docs.map((doc) => {
        let thumbnail = "https://nytimes.com/" + doc.multimedia.filter(d => d.subType === "xlarge").map(d => d.url)
        let image = "https://nytimes.com/" + doc.multimedia.filter(d => d.subType === "thumbLarge").map(d => d.url)
        doc.thumbnail = thumbnail;
        doc.image = image;
        return doc
    })
    return response
}
export class ArticlesSaga extends BaseSaga {
    constructor(api: Api) {
        super(api);
    }

    @autobind
    public * fetchArticles(action: any): IterableIterator<CallEffect | PutEffect<any>> {
        try {
            yield put(getArticles.setPending(null));
            const payload: IArticles = yield call(this.api.articles.getArticles, action.payload.sort);
            const restructuredPayload = restructurePayload(payload.response)
            yield put(getArticles.setFulfilled(restructuredPayload));
        } catch (e) {
            yield put(getArticles.setRejected(null, e.toString()));
        }
    }

    protected * registerListeners(): IterableIterator<ForkEffect> {
        yield takeLatest(getType(getArticles.invoke), this.fetchArticles);
    }
}
