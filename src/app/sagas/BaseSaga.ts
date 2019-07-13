import {fork, ForkEffect} from "redux-saga/effects";
import {Api} from "../sdk/Api";

export abstract class BaseSaga {
    constructor(protected api?: Api) {
        this.registerListeners = this.registerListeners.bind(this);
    }

    public watch(): ForkEffect {
        return fork(this.registerListeners);
    }

    protected abstract registerListeners(): IterableIterator<ForkEffect>;
}
