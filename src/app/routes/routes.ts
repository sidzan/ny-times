import {actions} from "redux-router5";

interface IRoute {
    name: string;
    path: string;
}

const articlesList: IRoute = {
    name: "home", path: "/"
};
const articleDetail: IRoute = {
    name: "details", path: "/details"
};
const routes: IRoute[] = [
    articlesList,
    {name: "counter", path: "/counter"},
    articleDetail
];

export const navigate = {
    toArticleDetail: (articleId: string) => actions.navigateTo(articleDetail.name, {articleId}),
    toArticlesList: () => actions.navigateTo(articlesList.name)
};

export default routes;
