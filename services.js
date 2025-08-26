import axios, { AxiosRequestConfig } from "axios";

// Base config (optional: set API base url here)
const api = axios.create({
    baseURL: "http://localhost:5000/api", // change as needed
    timeout: 10000, // 10s timeout
});

// Generic GET
const get = async(
        url,
    params = {},
    headers = {}
)=> {
    try {
        const config = { params, headers };
        const response = await api.get<T>(url, config);
        return response.data;
    } catch (error) {
        console.error("GET Error:", error?.response || error.message);
        throw error?.response?.data || error.message;
    }
};

// Generic POST
const post = async (
        url,
    body,
    params,
    headers
) => {
    try {
        const config = { params, headers };
        const response = await api.post(url, body, config);
        return response.data;
    } catch (error) {
        console.error("POST Error:", error?.response || error.message);
        throw error?.response?.data || error.message;
    }
};

export { get, post };
