import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth'; 

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://hikip-django-e06ccc5f06d1.herokuapp.com/api';

// const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const BaseApi = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});

// Adding an interceptor to inject the token into the headers before each request
BaseApi.interceptors.request.use(async (config) => {
    try {
        const session = await fetchAuthSession() // Fetches the current session with user details
        const authJwtToken = session.tokens.accessToken.toString() // Gets the JWT token from the session
        config.headers.Authorization = `Bearer ${authJwtToken}` // Appends the JWT token in the Authorization header
    } catch (error) {
        console.error("Error getting the authentication token:", error);
        // Optionally, you can handle errors here such as logging out the user
    }
    return config;  // Return the configuration object with the updated headers
}, (error) => {
    return Promise.reject(error);
});


export function handleApiError(error) {
    console.log(error);
    if (error.response) {
        console.log(`API Error, status code: ${error.response.status}`);
        switch (error.response.status) {
            case 400:
                console.error("Bad Request - the request was improperly formatted.");
                break;
            case 401:
                console.error("Unauthorized - please verify your authentication credentials.");
                break;
            case 403:
                console.error("Forbidden - you do not have permission to access this resource.");
                break;
            case 404:
                console.error("Not Found - the requested resource was not found.");
                break;
            case 500:
                console.error("Internal Server Error - something has gone wrong on the server side.");
                break;
            case 503:
                console.error("Service Unavailable - the server is temporarily unable to handle the request.");
                break;
            default:
                console.error(`Unhandled error - ${error.response.data.detail || "No details provided."}`);
        }
    } else if (error.request) {
        console.log('API Error, no response received.');
    } else {
        console.log('Error setting up the request.');
    }
}