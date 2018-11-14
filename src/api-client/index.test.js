// @flow

import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import loadHouses from "./index";

describe("api-client", () => {

    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios)
    });

    afterEach(() => {
        mock.reset();
    });

    it("can load houses from mock", () => {
        mock.onGet().reply(200, [{
            "url": "https://www.anapioficeandfire.com/api/houses/1",
            "name": "Test House Algood",
            "region": "The Westerlands",
            "coatOfArms": "A golden wreath, on a blue field with a gold border(Azure, a garland of laurel within a bordure or)",
            "words": "",
            "titles": [""],
            "seats": [""],
            "currentLord": "",
            "heir": "",
            "overlord": "https://www.anapioficeandfire.com/api/houses/229",
            "founded": "",
            "founder": "",
            "diedOut": "",
            "ancestralWeapons": [""],
            "cadetBranches": [],
            "swornMembers": []
        }]);

        const request = loadHouses(1);
        expect.assertions(1);

        return request.then(houses => expect(houses[0]).toMatchObject({
            name: "Test House Algood",
            region: "The Westerlands"
        }));
    });

});
