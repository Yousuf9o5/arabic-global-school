import axios from "axios";

export const API = axios.create({
    baseURL: "https://main-website-api.arabicglobalschool.com/api",
    timeout: 25000,
});
