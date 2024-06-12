import axios from "axios";
import { BaseApi, handleApiError } from "./BaseAPI";
const clientsEndpoint = '/client/clients/';

export const fetchClients = async (page=1) => {
    try {
        const response = await BaseApi.get(`${clientsEndpoint}?page=${page}`);
        return {
            data: response.data.results, // array of clients
            totalCount: response.data.count, // total number of clients
            nextPage: response.data.next, // URL of the next page
            previousPage: response.data.previous // URL of the previous page
        };
    } catch (error) {
        console.error('Error fetching clients:', error);
        handleApiError(error);
        throw new Error('Failed to fetch clients');
    }
};

export const fetchClient = async ({params}) => {
    try {
        const response = await BaseApi.get(`${clientsEndpoint}${params.clientId}`);
        return response.data
    } catch (error) {
        handleApiError(error);
        throw new Error('Failed to fetch clients');
    }
};

export const fetchClientAppointments = async ({params}) => {
    try {
        const response = await BaseApi.get(`${clientsEndpoint}${params.clientId}/appointments`);
        return response.data
    } catch (error) {
        handleApiError(error);
        throw new Error('Failed to fetch clients');
    }
};

export const fetchClientBills = async ({params}) => {
    try {
        const response = await BaseApi.get(`${clientsEndpoint}${params.clientId}/bills`);
        return response.data
    } catch (error) {
        handleApiError(error);
        throw new Error('Failed to fetch clients');
    }
};

export const fetchClientNotes = async ({params}) => {
    try {
        console.log(params, "Fetching notes");
        const response = await BaseApi.get(`${clientsEndpoint}${params.clientId}/notes/${params.noteType}`);
        return response.data
    } catch (error) {
        handleApiError(error);
        throw new Error('Failed to fetch clients');
    }
};
