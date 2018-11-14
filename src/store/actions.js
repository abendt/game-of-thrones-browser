// @flow

import loadHouses, { isLastPage } from "../api-client";
import type { House } from "../types";
import { ThunkAction } from "redux-thunk";
import type { State } from "./state";

type SelectHouse = {
    type: "SELECT_HOUSE",
    house: House
};

type LoadHousesFulfilled = {
    type: "LOAD_HOUSES_FULFILLED",
    payload: Array<House>,
    meta: {
        page: number
    }
};

export type ReducerAction = LoadHousesFulfilled | SelectHouse;

type LoadHousesAction = {
    type: string,
    payload: Promise<any>,
    meta: {
        page: number
    }
};

export const requestLoadHouses = (page: number): LoadHousesAction => ({
    type: "LOAD_HOUSES",
    payload: loadHouses(page),
    meta: {
        page
    }
});

export const requestSelectHouse = (house: House): SelectHouse => ({
    type: "SELECT_HOUSE",
    house
});

export const requestPageBackward = (): ThunkAction => (
    dispatch,
    getState: () => State
) => {
    const currentPage = getState().currentPage;

    if (currentPage > 1) {
        dispatch(requestLoadHouses(currentPage - 1));
    }
};

export const requestPageForward = (): ThunkAction => (
    dispatch,
    getState: () => State
) => {
    const state = getState();
    const currentPage = state.currentPage;

    if (!isLastPage(state.houses)) {
        dispatch(requestLoadHouses(currentPage + 1));
    }
};
