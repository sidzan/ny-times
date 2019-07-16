import * as moment from "moment";
import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {media, style} from "typestyle";
import {DetailsParagraph, DetailsTitle, SubTitle} from "../components/Typography";
import {Width} from "../constants/Width";
import {IStore} from "../redux/IStore";
import {navigate} from "../routes/routes";
import {IDocRestrutrued} from "../sdk/Interface/Article";
import {getArticleDetails} from "../selectors/ArticlesSelectors";

interface IStateToProps {
    data: Partial<IDocRestrutrued>;
}

interface IDispatchToProps {
    toArticlesList: () => void;
}

interface IProps extends IStateToProps, IDispatchToProps {
}

const className = style(
    {
        $nest: {
            ".date": {
                $nest: {
                    "div": {
                        textAlign: "center",
                        fontSize: 12,
                        padding: 1
                    },
                    ".month": {
                        textTransform: "uppercase"
                    }
                },
                cursor: "pointer",
                display: "flex"
            },
            ".content": {
                display: "flex"
            }
        }
    },
    media(
        {
            maxWidth: Width.TABLET,
            minWidth: Width.MOBILE
        },
        {
            $nest: {
                ".content": {
                    flexDirection: "column"
                }
            }
        }
    ),
    media(
        {
            maxWidth: Width.MOBILE,
            minWidth: 0
        },
        {
            $nest: {
                ".content": {
                    flexDirection: "column-reverse",
                    $nest: {
                        img: {width: "100%"}
                    }

                }
            }
        })
);

class Details extends React.Component<IProps> {
    public static defaultProps: IStateToProps = {
        data: {}
    };

    constructor(props: IProps) {
        super(props);
        if (!props.data) {
            props.toArticlesList();
        }
    }

    public render(): JSX.Element {
        const {data} = this.props;
        const {headline, lead_paragraph, pub_date, byline} = data;
        const day = moment(pub_date).date().toString();
        const month = moment(pub_date).format("MMM");
        const year = moment(pub_date).format("YYYY");
        return (
            <div className={"container"} style={{textAlign: "left"}}>
                <div className={className}>
                    <DetailsTitle>{headline.main}</DetailsTitle>
                    <SubTitle>{byline.original}</SubTitle>
                    <div className={"date"}>
                        <div className="day">{day}</div>
                        <div className="month">{month}</div>
                        <div className="year">{year}</div>
                    </div>
                    <hr/>
                    <section className={"content"}>
                        <DetailsParagraph>{lead_paragraph}</DetailsParagraph>
                        {this.renderImage()}
                    </section>
                </div>
            </div>
        );
    }

    private renderImage() {
        const {data} = this.props;
        const {hasImage, thumbnail, section_name} = data;
        if (hasImage) {
            return (
                <div>
                    <img src={thumbnail} alt={section_name}/>
                </div>
            );
        }
    }
}

function mapStateToProps(state: Pick<IStore, "articles" | "router">): IStateToProps {
    return {
        data: getArticleDetails(state)
    };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return {
        toArticlesList: () => dispatch(navigate.toArticlesList())
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Details);

export {connected as Details};
