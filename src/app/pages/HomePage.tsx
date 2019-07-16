import * as React from "react";
import {style} from "typestyle";
import {Articles} from "../containers/Articles";
import {Search} from "../containers/Search";

const homePageStyle = style(
    {
        margin: "auto",
        width: "90%"
    });

class HomePage extends React.Component {
    public render(): JSX.Element {
        return (
            <div>
                <div className={"row"} style={{paddingBottom: 25}}>
                    <Search/>
                </div>
                <div className={homePageStyle}>
                    <Articles/>
                </div>
            </div>
        );
    }
}

export {HomePage};
