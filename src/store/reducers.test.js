// @flow

import {selectedHouse} from "./reducers";
import * as actions from "./actions";
import type {House} from "../types";

const givenHouse = (url: string): House => ({
    url,
    name: "House Algood",
    region: "The Westerlands",
    coatOfArms: "",
    words: "",
    titles: []
});

describe("reducers", () => {

    describe("selectedHouse", () => {

        it("can select house", () => {
            const house = givenHouse("url");
            const state = selectedHouse(null, actions.requestSelectHouse(house))

            expect(state).toBe(house);
        });

        it("can unselect house", () => {
            const house = givenHouse("url");
            let state = selectedHouse(null, actions.requestSelectHouse(house));
            state = selectedHouse(state, actions.requestSelectHouse(house));

            expect(state).toBeNull();
        });
    });

});
