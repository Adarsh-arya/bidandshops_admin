import axios from "axios";
import { getStorage } from "./storage";

export const apiUrl = "https://bidandshops.com";

export default async (path = "/", method = "GET", data = {}) => {
    var options = {
        method: method,
        url: apiUrl + path,
        headers: {
            Accept: '*/*',
            Authorization: 'barer ' + (getStorage("auth") || "").toString(),
            'Content-Type': 'application/json'
        },
        data: data,
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        if (error.response?.status == 401) {
            if (typeof window !== "undefined") {
                window.location.replace("/admin/login");
                return false;
            }
        }
        throw error;
    }
}

export const uploadFileRequest = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const options = {
        method: 'POST',
        url: apiUrl + '/upload',
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + (getStorage("auth") || "").toString(),
        },
        data: formData,
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        throw error;
    }
};
