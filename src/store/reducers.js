// @flow

import type {ReducerAction} from "./actions";
import type {House} from "../types";
import {isHouseEqualTo} from "../types";
import {combineReducers} from "redux";

export const activeRequest = (state: boolean = false, action: ReducerAction) => {
    if (action.type.endsWith("_PENDING")) {
        return true;
    } else if (action.type.endsWith("_FULFILLED")) {
        return false;
    }
    return state;
};

export const houses = (state: Array<House> = [], action: ReducerAction) => {
    if (action.type === "LOAD_HOUSES_FULFILLED") {
        return action.payload;
    }
    return state;
};

export const currentPage = (state: number = 1, action: ReducerAction) => {
    if (action.type === "LOAD_HOUSES_FULFILLED") {
        return action.meta.page;
    }
    return state;
};

export const selectedHouse = (state: ?House = null, action: ReducerAction) => {
    if (action.type === "SELECT_HOUSE") {
        const selectedHouse = action.house;

        if (isHouseEqualTo(selectedHouse, state)) {
            return null;
        } else {
            return selectedHouse;
        }
    }

    return state;
};

const rootReducer = combineReducers({
    activeRequest,
    houses,
    currentPage,
    selectedHouse
});

export default rootReducer;
