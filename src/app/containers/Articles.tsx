import * as moment from "moment";
import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {media, style} from "typestyle";
import {Card} from "../components/Card";
import {Loading} from "../components/Loading";
import {Width} from "../constants/Width";
import {IStore} from "../redux/IStore";
import {getArticles as getArticlesActionCreator} from "../redux/modules/Articles/articlesActionCretors";
import {navigate} from "../routes/routes";
import {IDocRestrutrued} from "../sdk/Interface/Article";
import {curateArticles} from "../selectors/ArticlesSelectors";

interface IData {
    data: IDocRestrutrued[];
    length: number;
}

interface IStateToProps {
    newsWithImage: IData;
    newsWithoutImage: IData;
    loaded: boolean;
    pending: boolean;
    error: string;
}

interface IDispatchToProps {
    getArticles: () => void;
    toArticleDetail: (id: string) => void;
}

interface IProps extends IStateToProps, IDispatchToProps {
}

const ArticlesContainer = style(
    {
        display: "grid",
        gridGap: 25,
        gridTemplateColumns: "repeat(5, 1fr)",
        paddingBottom: 25
    },
    media(
        {
            maxWidth: Width.TABLET,
            minWidth: Width.MOBILE
        },
        {
            gridGap: 20,
            gridTemplateColumns: "auto auto auto"
        }
    ),
    media(
        {
            maxWidth: Width.MOBILE,
            minWidth: 0
        },
        {
            gridGap: 15,
            gridTemplateColumns: "auto auto"
        })
);

class Articles extends React.Component<IProps> {
    constructor(props: IStateToProps & IDispatchToProps) {
        super(props);
        if (!this.props.loaded) {
            this.props.getArticles();
        }
        this.renderDocs = this.renderDocs.bind(this);
        this.navigate = this.navigate.bind(this);
        this.renderArticles = this.renderArticles.bind(this);
    }

    public render(): JSX.Element {
        const {error, pending} = this.props;
        if (pending) {
            return <Loading/>;
        } else {
            return error ? <div>{error}</div> : this.renderArticles();
        }
    }

    private renderArticles(): JSX.Element {
        const {newsWithoutImage, newsWithImage} = this.props;
        return (
            <React.Fragment>
                <div className={ArticlesContainer}>
                    {newsWithImage.data.map(this.renderDocs)}
                    {newsWithoutImage.data.map(this.renderDocs)}
                </div>
            </React.Fragment>
        );
    }

    private renderDocs(doc: IDocRestrutrued): JSX.Element {
        const {_id, headline: {name, main}, pub_date, lead_paragraph, thumbnail, snippet, type_of_material, hasImage} = doc;
        const day = moment(pub_date).date().toString();
        const month = moment(pub_date).format("MMM");
        const year = moment(pub_date).format("YYYY");

        return (
            <Card
                key={_id}
                onClick={this.navigate(_id)}
                day={day}
                month={month}
                year={year}
                category={type_of_material}
                description={lead_paragraph}
                img={thumbnail}
                subTitle={name || snippet}
                title={name || main}
                hasImage={hasImage}
            />
        );
    }

    private navigate(id): () => void {
        const {toArticleDetail} = this.props;
        return () => {
            toArticleDetail(id);
        };
    }
}

function mapStateToProps(state: Pick<IStore, "articles">): IStateToProps {
    console.log(curateArticles(state));
    return {
        newsWithImage: curateArticles(state).newsWithImage,
        newsWithoutImage: curateArticles(state).newsWithoutImage,
        loaded: state.articles.loaded,
        pending: state.articles.pending,
        error: state.articles.error
    };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return {
        getArticles: () => dispatch(getArticlesActionCreator.invoke(null)),
        toArticleDetail: (id) => dispatch(navigate.toArticleDetail(id))
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Articles);

export {connected as Articles};
