import {createSelector} from "reselect";
import {IStore} from "../redux/IStore";

const sort = (state: Pick<IStore, "articles">) => state.articles.sort;
const searchKey = (state: Pick<IStore, "articles">) => state.articles.searchQuery;

export const getSort = createSelector(
    [sort],
    (sortValue) => sortValue
);

export const getSearchKey = createSelector(
    [searchKey],
    (searchKey) => searchKey
);

const withImages = ((state: Pick<IStore, "articles">) => state.articles.data.docs.filter((doc) => doc.hasImage === true));
const withoutImages = ((state: Pick<IStore, "articles">) => state.articles.data.docs.filter((doc) => doc.hasImage === false));

export const curateArticles = createSelector(
    [withImages, withoutImages],
    (a, b) => {
        const newsWithImage = {data: a, length: a.length};
        const newsWithoutImage = {data: b, length: b.length};
        return {newsWithImage, newsWithoutImage};
    }
);

const details = ((state: Pick<IStore, "articles" | "router">) => state.articles.data.docs.filter((doc) => doc._id === state.router.route.params.articleId));

export const getArticleDetails = createSelector(
    [details],
    (data) => data[0]
);
