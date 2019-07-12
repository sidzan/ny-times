interface IRoute {
    name: string;
    path: string;
}

const routes: IRoute[] = [
    {name: "home", path: "/"},
    {name: "counter", path: "/counter"}

];

export default routes;
