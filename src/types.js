// @flow

// this is only a subset of all available house information:
// https://anapioficeandfire.com/Documentation#houses.
// we are going to use just them in this demo.
export type House = {
    +url: string,
    +name: string,
    +region: string,
    +coatOfArms: string,
    +words: string,
    +titles: Array<string>
}

export const isHouseEqualTo = (house: House, other: ?House) => other != null && house.url === other.url;
