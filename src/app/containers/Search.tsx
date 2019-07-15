import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {media, style} from "typestyle";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import {Width} from "../constants/Width";
import {IStore} from "../redux/IStore";
import {
    clearSearchFilterArticles,
    getArticles as getArticlesActionCreator,
    searchFilters,
    sortArticles as sortArticlesActionCreator
} from "../redux/modules/Articles/articlesActionCretors";

interface IStateToProps {
    searchQuery: string;
    sort: string;
}

interface IDispatchToProps {
    sortArticles: (sort) => void;
    clearSearchFilterArticles: () => void;
    searchFilters: (searchQuery: string) => void;
    getArticles: () => void;
}

interface IProps extends IStateToProps, IDispatchToProps {
};

const className = style(
    {
        height: 100,
        "-webkit-backdrop-filter": "blur(30px)",
        backdropFilter: "blur(30px)",
        backgroundColor: "#ffffff",
        background: "white",
        border: "solid 1px #d8d8d8",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "$nest": {
            ".item1": {
                flex: 11,
                $nest: {
                    input: {
                        height: "inherit",
                        borderRadius: 0,
                        padding: 10,
                        paddingLeft: 95,
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8, %3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3e%3cdefs%3e%3cstyle%3e .cls-1 %7b fill: %23202020;%7d %3c/style%3e%3c/defs%3e%3cg id='Search' transform='translate(-1170 -37.896)'%3e%3cpath id='Path_208' data-name='Path 208' class='cls-1' d='M18,16.318l-3.913-3.13c1.032-1.376,2.348-3.643,2.348-5.478,0-4.473-4.136-7.826-8.609-7.826A7.641,7.641,0,0,0,0,7.709c0,4.473,3.354,8.609,7.826,8.609a7.473,7.473,0,0,0,4.7-1.565l3.913,3.13ZM2.348,7.709A5.257,5.257,0,0,1,7.826,2.231c3.211,0,6.261,2.267,6.261,5.478A6.606,6.606,0,0,1,7.826,13.97C4.615,13.97,2.348,10.92,2.348,7.709Z' transform='translate(1170 38.013)'/%3e%3c/g%3e%3c/svg%3e ")`,
                        backgroundSize: 23,
                        backgroundPosition: "50px center",
                        backgroundRepeat: "no-repeat",
                        fontFamily: "Nunito",
                        fontWeight: 700,
                        border: "1px solid #d8d8d8",
                        width: "100%",
                        fontSize: 20,
                        outline: "none"
                    }
                },
                height: "inherit"
            },
            ".item2": {
                display: "flex",
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                $nest: {
                    select: {
                        background: "white",
                        border: 0
                    }
                }
            },
            ".item3": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 100,
                height: "100% !important",
                backgroundColor: "#202020",
                color: "white"
            }
        }
    },
    media(
        {
            maxWidth: Width.MOBILE,
            minWidth: 0
        },
        {
            fontFamily: "Nunito",
            fontWeight: 700,
            height: 50,
            fontSize: 10,
            $nest: {
                ".item1": {
                    $nest: {
                        input: {
                            backgroundPosition: "20px center",
                            paddingLeft: 46,
                            fontSize: 10,
                            backgroundSize: 18
                        }
                    }
                },
                ".item2": {
                    $nest: {
                        select: {
                            fontSize: 10
                        }
                    }
                },
                ".item3": {
                    flex: 1,
                    fontSize: 10
                }
            }
        }
    ));

class Search extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    public render(): JSX.Element {
        const {clearSearchFilterArticles, searchQuery} = this.props;
        const values = {
            type: "text",
            value: searchQuery,
            placeholder: "Search",
            onChange: this.onChange
        };
        return (
            <div className={className}>
                <div className={"input item1"}>
                    <Input {...values}/>
                </div>
                <div className={"item2"}>
                    <select onClick={this.handleSort}>
                        <option value={"newest"}>Newest First</option>
                        <option value={"oldest"}>Oldest First</option>
                    </select>
                </div>
                <Button className={"item3"} onClick={clearSearchFilterArticles}>Clear</Button>
            </div>
        );
    }

    private onChange(e: any): void {
        const {searchFilters} = this.props;
        searchFilters(e.target.value);
    }

    private handleSort(e): void {
        const {sortArticles, sort} = this.props;
        if (sort === e.target.value) {
            return;
        }
        sortArticles(e.target.value);
    }
}

function mapStateToProps(state: Pick<IStore, "articles">): IStateToProps {
    return {
        searchQuery: state.articles.searchQuery,
        sort: state.articles.sort
    };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return {
        sortArticles: (sort) => dispatch(sortArticlesActionCreator(sort)),
        searchFilters: (searchQuery) => dispatch(searchFilters(searchQuery)),
        getArticles: () => dispatch(getArticlesActionCreator.invoke(null)),
        clearSearchFilterArticles: () => dispatch(clearSearchFilterArticles())
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Search);
export {connected as Search};
