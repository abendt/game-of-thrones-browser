// @flow

import type {House} from "../types";

// use flow to enforce redux state immutability (see https://flow.org/en/docs/react/redux/)

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
