// @flow

import loadHouses from "./index";

describe("got-client", () => {

    it("can load houses", () => {
        const request = loadHouses(1);
        expect.assertions(1);

        return request.then(res => expect(res[0].name).toBe("House Algood"));
    });

});
