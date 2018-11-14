// @flow

import axios from "axios";
import type {House} from "../types";

const pageSize = 10;

const loadHouses = (page: number): Promise<Array<House>> => axios.get("https://www.anapioficeandfire.com/api/houses", {
    params: {
        page,
        pageSize
    }
}).then(response => response.data);

export const isLastPage = (houses: Array<House>) => houses.length < pageSize;

export default loadHouses
