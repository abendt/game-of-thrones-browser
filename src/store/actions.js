// @flow

import loadHouses, { isLastPage } from "../api-client";
import type { House } from "../types";
import { ThunkAction } from "redux-thunk";
import type { State } from "./state";

// see https://flow.org/en/docs/react/redux/ for an explanation how to use Flow types with Redux

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

// actions with a promise payload are handled by the promise middleware https://github.com/pburtchaell/redux-promise-middleware

type LoadHousesAction = {
    type: string,
    payload: Promise<any>,
    meta: {
        page: number
    }
};

// Action creators

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
