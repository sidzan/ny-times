import * as React from "react";
import {style} from "typestyle";
import {Paragraph, Title} from "./Typography";

const cardStyle = style(
    {
        $nest: {
            // IMPORTANT PART
            "img": {
                width: "100%"
            },
            "&:hover": {
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
            },
            ".card-container": {
                $nest: {
                    ".header": {
                        $nest: {
                            ".date": {
                                "$nest": {
                                    div: {
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
                            }
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }

                },
                padding: "0 20px"
            }
        },
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        width: "100%",
        textAlign: "left"
    });

export interface IProps {
    onClick: () => void;
    day: string;
    year: string;
    month: string;
    category: string;
    title: string;
    subTitle: string;
    description: string;
    img: string;
    hasImage: boolean;
}

class Card extends React.Component<IProps> {
    public render(): JSX.Element {
        const {day, month, year, title, category, description, hasImage, onClick} = this.props;
        if (hasImage) {
            return this.renderWithImage();
        }
        return (
            <div className={cardStyle} onClick={onClick}>
                {this.renderImage()}
                <div className="card-container">
                    <div className={"header"}>
                        <h4><b>{category}</b></h4>
                        <div className={"date"}>
                            <div className="day">{day}</div>
                            <div className="month">{month}</div>
                            <div className="year">{year}</div>
                        </div>
                    </div>
                    <Title>{title}</Title>
                    <Paragraph>
                        {description.slice(0, 150)}
                    </Paragraph>
                </div>
            </div>
        );
    }

    private renderWithImage() {
        const {day, month, year, title, category, onClick} = this.props;
        return (
            <div className={cardStyle} onClick={onClick}>
                {this.renderImage()}
                <div className="card-container">
                    <div className={"header"}>
                        <h4><b>{category}</b></h4>
                        <div className={"date"}>
                            <div className="day">{day}</div>
                            <div className="month">{month}</div>
                            <div className="year">{year}</div>
                        </div>
                    </div>
                    <Title>{title}</Title>
                </div>
            </div>);
    }

    private renderImage(): JSX.Element {
        const {hasImage, img, title} = this.props;
        if (hasImage) {
            return (
                <img src={img} alt={title}/>
            );
        }
    }
}

export {Card};

// Working Full
// <div className={cardStyle}>
//     <div className="post-module">
//     <div className="thumbnail">
//     <div className="date">
//     <div className="day">{day}</div>
// <div className="month">{month}</div>
// </div>
// <img src={img}/>
// </div>
// <div className="post-content">
// <div className="category">{category}</div>
// <h1 className="title">{title}</h1>
// <h2 className="sub_title">{subTitle}</h2>
// <p className="description">{description}</p>
// {/* <div className="post-meta"><span className="timestamp"><i className="fa fa-clock-">o</i> 6 mins ago</span><span className="comments"><i className="fa fa-comments"></i><a href="#"> 39 comments</a></span></div> */}
// </div>
// </div>
// </div>
