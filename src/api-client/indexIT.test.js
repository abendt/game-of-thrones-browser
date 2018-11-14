// @flow

import loadHouses from "./index";

describe("api-client integration test", () => {
    it("can load houses from actual endpoint", () => {
        const request = loadHouses(1);
        expect.assertions(1);

        return request.then((res) =>
            expect(res[0]).toMatchObject({
                name: "House Algood",
                region: "The Westerlands"
            })
        );
    });
});
