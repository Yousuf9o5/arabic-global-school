import axios from "axios";

export const API = axios.create({
    baseURL: "https://main-website-api.arabicglobalschool.com/api/website",
    timeout: 25000,
});
