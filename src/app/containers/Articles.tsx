import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Button} from "../components/Button";
import {IStore} from "../redux/IStore";
import {
    getArticles as getArticlesActionCreator, IRequestOptions
} from "../redux/modules/Articles/articlesActionCretors";
import {IDoc, IResponse} from "../sdk/Interface/Article";

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

class Articles extends React.Component<IProps> {
    constructor(props: IStateToProps & IDispatchToProps) {
        super(props);
        if (!this.props.loaded) {
            this.props.getArticles();
        }
        this.renderArticles = this.renderArticles.bind(this);
    }

    public render(): JSX.Element {
        const {error, pending} = this.props;
        if (pending) {
            return <div>Loading</div>;
        } else {
            return error ? <div>{error}</div> : <div>{this.renderArticles()}</div>;
        }
    }

    private renderArticles(): JSX.Element {
        const {data} = this.props;
        const {docs} = data;
        return (
            <div>
                articles
                {docs.map(this.renderDocs)}
                <Button onClick={this.handleSort("newest")}>Newest First</Button>
                <Button onClick={this.handleSort("oldest")}>Oldest First</Button>
            </div>
        );
    }

    private handleSort(sort: "newest" | "oldest"): () => void {
        const {getArticles} = this.props;
        return () => getArticles({sort});
    }

    private renderDocs(doc: IDoc, index): JSX.Element {
        return (
            <div key={doc._id}>
                {index}. {doc.headline.main} - {doc.type_of_material} - {doc.pub_date}
            </div>
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

export {connected as Articles};
