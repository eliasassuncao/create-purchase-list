import axios from 'axios'
import {URLS} from "../constants";

export const fetchCategory = () => {
    return axios.get(`${URLS.CATEGORY}`)
};

export const fetchFood = () => {
    return axios.get(`${URLS.FOOD}`)
};
