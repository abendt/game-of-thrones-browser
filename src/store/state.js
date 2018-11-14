// @flow

import type {House} from "../types";

export type State = {
    +currentPage: number,
    +houses: Array<House>,
    +selectedHouse: ?House,
    +activeRequest: boolean
}

export const initialState: State = {
    currentPage: 1,
    houses: [],
    selectedHouse: null,
    activeRequest: false
};
