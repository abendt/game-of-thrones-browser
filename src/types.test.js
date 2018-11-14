// @flow

import {isHouseEqualTo} from "./types";
import type {House} from "./types";

const givenHouse = (url: string): House => ({
    url,
    name: "House Algood",
    region: "The Westerlands",
    coatOfArms: "",
    words: "",
    titles: []
});

describe("type", () => {

    describe("house", () => {

        it("two houses are equal when the url is equal", () => {
            expect(isHouseEqualTo(givenHouse("url1"), givenHouse("url1"))).toBeTruthy()
        });

        it("two houses are equal when the url is not equal", () => {
            expect(isHouseEqualTo(givenHouse("url1"), givenHouse("url2"))).toBeFalsy()
        });

        it("two houses are not equal when other is null", () => {
            expect(isHouseEqualTo(givenHouse("url1"), null)).toBeFalsy()
        });
    });

});
