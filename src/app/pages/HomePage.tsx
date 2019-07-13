import * as React from "react";
import {Articles} from "../containers/Articles";

class HomePage extends React.Component {
    public render(): JSX.Element {
        return (
            <div>
                HomePage
                <Articles/>
            </div>
        );
    }
}

export {HomePage};
