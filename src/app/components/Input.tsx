import * as React from "react";

class Input extends React.Component {
    public render(): JSX.Element {
        const {...rest} = this.props;
        return (
            <input {...rest}/>
        );
    }
}

export {Input};
