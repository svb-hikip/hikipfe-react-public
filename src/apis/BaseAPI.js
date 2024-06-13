import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth'; 
import { toast } from 'react-toastify';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://hikip-django-e06ccc5f06d1.herokuapp.com/api';

//const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const BaseApi = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});

// Adding an interceptor to inject the token into the headers before each request
BaseApi.interceptors.request.use(async (config) => {
    try {
        const session = await fetchAuthSession() // Fetches the current session with user details
        if (session) {
            const authJwtToken = session.tokens.accessToken.toString();
            config.headers.Authorization = `Bearer ${authJwtToken}`;
        }
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
        switch (error.response.status) {
            case 400:
                toast.error("Bad Request - the request was improperly formatted.");
                break;
            case 401:
                toast.error("Unauthorized - please verify your authentication credentials.");
                break;
            case 403:
                toast.error("Forbidden - you do not have permission to access this resource.");
                break;
            case 404:
                toast.error("Not Found - the requested resource was not found.");
                break;
            case 500:
                toast.error("Internal Server Error - something has gone wrong on the server side.");
                break;
            case 503:
                toast.error("Service Unavailable - the server is temporarily unable to handle the request.");
                break;
            default:
                toast.error(`Unhandled error - ${error.response.data.detail || "No details provided."}`);
        }
    } else if (error.request) {
        toast.error('API Error, no response received.');
    } else {
        toast.error('Error setting up the request.');
    }
    return error;
}
