import * as React from "react";
import {classes, media, style, stylesheet} from "typestyle";
import {Width} from "../constants/Width";

const TitleClass = style(
    {
        fontSize: 23,
        fontFamily: "Georgia",
        color: "#202020",
        letterSpacing: "0.6px",
        textTransform: "capitalize"
    },
    media(
        {
            maxWidth: Width.TABLET,
            minWidth: Width.MOBILE
        },
        {
            fontSize: 20
        }
    ),
    media(
        {
            maxWidth: Width.MOBILE,
            minWidth: 0
        },
        {
            fontSize: 15
        })
);
export const Title = ({children}) => (
    <h2 className={TitleClass}>{children}</h2>
);

const DetailsTitleClass = style(
    {
        fontSize: 32,
        fontFamily: "Georgia",
        color: "#202020",
        letterSpacing: "0.6px",
        textTransform: "capitalize"
    },
    media(
        {
            maxWidth: Width.TABLET,
            minWidth: Width.MOBILE
        },
        {
            fontSize: 20
        }
    ),
    media(
        {
            maxWidth: Width.MOBILE,
            minWidth: 0
        },
        {
            fontSize: 15
        })
);
export const DetailsTitle = ({children}) => (
    <h2 className={DetailsTitleClass}>{children}</h2>
);

const SubTitleClass = style(
    {
        fontFamily: "Nunito",
        fontSize: 18,
        fontWeight: 400,
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: 1.44,
        textAlign: "left",
        color: "#707070"

    }, media(
        {
            maxWidth: Width.TABLET,
            minWidth: Width.MOBILE
        },
        {
            fontSize: 16
        }
    ),
    media(
        {
            maxWidth: Width.MOBILE,
            minWidth: 0
        },
        {
            fontSize: 12
        }));

export const SubTitle = ({children}) => (
    <h3 className={SubTitleClass}>{children}</h3>
);

const ParagraphClass = style(
    {
        fontFamily: "Nunito",
        fontSize: 16,
        fontWeight: 400,
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: 1.44,
        textAlign: "left",
        color: "#707070"

    }, media(
        {
            maxWidth: Width.TABLET,
            minWidth: Width.MOBILE
        },
        {
            fontSize: 15
        }
    ),
    media(
        {
            maxWidth: Width.MOBILE,
            minWidth: 0
        },
        {
            fontSize: 12
        }));
export const Paragraph = ({children}) => (
    <p className={ParagraphClass}>{children}</p>
);
const DetailsParagraphClass = style(
    {
        fontFamily: "Nunito",
        fontSize: 26,
        fontWeight: 400,
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: 1.44,
        textAlign: "left",
        color: "#707070"

    }, media(
        {
            maxWidth: Width.TABLET,
            minWidth: Width.MOBILE
        },
        {
            fontSize: 15
        }
    ),
    media(
        {
            maxWidth: Width.MOBILE,
            minWidth: 0
        },
        {
            fontSize: 12
        }));
export const DetailsParagraph = ({children}) => (
    <p className={DetailsParagraphClass}>{children}</p>
);

const LabelClass = stylesheet({
                                  root: {
                                      fontFamily: "Nunito",
                                      fontSize: 18,
                                      fontWeight: 400,
                                      fontStyle: "normal",
                                      fontStretch: "normal",
                                      lineHeight: 2.5,
                                      textAlign: "left",
                                      color: "#707070",
                                      textTransform: "capitalize"
                                  }
                              });

export const Label = ({children}) => (
    <label className={classes(LabelClass.root)}>{children}</label>
);
