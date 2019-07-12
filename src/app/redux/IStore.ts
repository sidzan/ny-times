import {ICounterState} from "./modules/counterModule";

export interface IStore {
    counter: ICounterState;
}
