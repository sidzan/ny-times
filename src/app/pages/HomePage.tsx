import * as React from "react";
import {Articles} from "../containers/Articles";
import {Search} from "../containers/Search";
import {style} from "typestyle";

const homePageStyle = style(
    {
        width: "90%",
        margin: "auto"
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
