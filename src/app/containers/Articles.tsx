import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button } from "../components/Button";
import { IStore } from "../redux/IStore";
import {
    getArticles as getArticlesActionCreator, IRequestOptions
} from "../redux/modules/Articles/articlesActionCretors";
import { IDoc, IResponse, IDocRestrutrued } from "../sdk/Interface/Article";
import { Card } from "../components/Card";
import * as moment from "moment";
import { style, media } from "typestyle";
import { Width } from "../constants/Width"
interface IStateToProps {
    data: IResponse;
    loaded: boolean;
    pending: boolean;
    error: string;
}

interface IDispatchToProps {
    getArticles: (options?: IRequestOptions) => void;
}

interface IProps extends IStateToProps, IDispatchToProps {
}
const ArticlesContainer = style({
    display: "grid",
    gridGap: 25,
    gridTemplateColumns: "auto auto auto auto"
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
        this.renderArticles = this.renderArticles.bind(this);
    }

    public render(): JSX.Element {
        const { error, pending } = this.props;
        if (pending) {
            return <div>Loading</div>;
        } else {
            return error ? <div>{error}</div> : this.renderArticles();
        }
    }

    private renderArticles(): JSX.Element {
        const { data } = this.props;
        const { docs } = data;
        return (
            <div className={ArticlesContainer}>
                {docs.map(this.renderDocs)}
                <Button onClick={this.handleSort("newest")}>Newest First</Button>
                <Button onClick={this.handleSort("oldest")}>Oldest First</Button>
            </div>
        );
    }

    private handleSort(sort: "newest" | "oldest"): () => void {
        const { getArticles } = this.props;
        return () => getArticles({ sort });
    }

    private renderDocs(doc: IDocRestrutrued, index): JSX.Element {
        const { _id, abstract, document_type, headline: { name }, pub_date, lead_paragraph, thumbnail } = doc;
        const day = moment(pub_date).date().toString()
        const month = moment(pub_date).format("MMM")
        return (
            <Card
                day={day}
                month={month}
                category={document_type}
                description={lead_paragraph}
                key={_id}
                img={thumbnail}
                subTitle={name}
                title={name}
            />

        );
    }
}

function mapStateToProps(state: Pick<IStore, "articles">): IStateToProps {
    return {
        data: state.articles.data,
        loaded: state.articles.loaded,
        pending: state.articles.pending,
        error: state.articles.error
    };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return {
        getArticles: (options: IRequestOptions) => dispatch(getArticlesActionCreator.invoke(options))
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Articles);

export { connected as Articles };
