import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {stylesheet} from "typestyle";
import {Button} from "../components/Button";
import {IStore} from "../redux/IStore";
import {
    decrement as decrementActionCreator,
    increment as incrementActionCreator
} from "../redux/modules/counterActionCreators";

const classNames = stylesheet(
    {
        moveRight: {
            marginLeft: "8px"
        }
    });

interface IStateToProps {
    count: number;
}

interface IDispatchToProps {
    decrement: () => void;
    increment: () => void;
}

export interface IProps extends IStateToProps, IDispatchToProps {
}

class CounterPage extends React.Component<IProps> {
    public render(): JSX.Element {
        const {count, decrement, increment} = this.props;
        return (
            <div>
                <h4>Counter</h4>
                <Button name="decBtn" onClick={decrement} disabled={count <= 0}>
                    Decrement
                </Button>
                <Button className={classNames.moveRight} name="incBtn" onClick={increment}>
                    Increment
                </Button>
                <p>{count}</p>
            </div>
        );
    }
}

function mapStateToProps(state: Pick<IStore, "counter">): IStateToProps {
    return {
        count: state.counter.count
    };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
    return {
        decrement: () => dispatch(decrementActionCreator()),
        increment: () => dispatch(incrementActionCreator())
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(CounterPage);

export {connected as CounterPage, CounterPage as UnconnectedCounterPage, mapDispatchToProps, mapStateToProps};
