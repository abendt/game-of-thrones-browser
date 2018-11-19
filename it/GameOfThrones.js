describe("Game of Thrones browser", () => {

    const EC = protractor.ExpectedConditions;
    const houses = element(by.css("[data-it-id=\"house-browser\"]"));
    const house = element.all(by.css('[data-it-id="house-row"]'));

    beforeAll(() => {
        browser.waitForAngularEnabled(false);
    });

    it("house overview is displayed", () => {

        browser.get("/");

        browser.wait(EC.visibilityOf(houses), 3000);

        expect(house.count()).toEqual(10);
    });
});
