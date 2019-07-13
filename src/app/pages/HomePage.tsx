import * as React from "react";
import { Articles } from "../containers/Articles";
import { Card } from "../components/Card";

class HomePage extends React.Component {
    public render(): JSX.Element {
        return (
            <div>
                HomePage
                <Articles />
            </div>
        );
    }
}

export { HomePage };
