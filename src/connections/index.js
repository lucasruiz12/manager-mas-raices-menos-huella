import axios from 'axios';
import { ACCESS_TOKEN, URL_BASE } from '../constants';

let token = localStorage.getItem(ACCESS_TOKEN);

const axiosToken = axios.create({
  headers: { 'Authorization': token },
});

export default {
    loginUser: (data) => {
        return axios.post(`${URL_BASE}/api/users/login`, data);
    },
    getUsers: () => {
        return axiosToken.get(`${URL_BASE}/api/users`);
    },
    createSeed: (data) => {
        return axiosToken.post(`${URL_BASE}/api/seeds/create`, data);
    },
    // createSeed: (data) => {
    //     return axios.post(`${URL_BASE}/api/seeds/create`, data);
    // },
};