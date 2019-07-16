import * as React from "react";
import {style} from "typestyle";
import {Paragraph, Title} from "./Typography";

const cardStyle = style(
    {
        $nest: {
            // IMPORTANT PART
            ".card-img": {
                $nest: {
                    img: {
                        objectFit: "cover",
                        overflow: "hidden",
                        height: "inherit",
                        width: "100%"
                    }
                },
                height: 200
            },
            "&:hover": {
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
            },
            ".card-container": {
                $nest: {
                    ".header": {
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
        textAlign: "left",
        maxHeight: 500,
        overflow: "hidden"
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
                <div className={"card-img"}>
                    <img src={img} alt={title}/>
                </div>
            );
        }
    }
}

export {Card};
