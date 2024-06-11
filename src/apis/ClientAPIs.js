import { BaseApi, handleApiError } from "./BaseAPI";

const clientsEndpoint = '/client/clients/';
const progressNotesEndpoint = '/client/progress-notes'
const clinicianNotesEndpoint = '/client/clinician-notes'
const dntNotesEndpoint = '/client/diagnosis-treatment-plans'

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

export const fetchProgressNotes = async ({params}) => {
    try {
      const response = await BaseApi.get(`${progressNotesEndpoint}/${params.UUID? params.UUID : ""}`, {
        params: { client: params.clientId, appointment: params.appointmentId,
         },
      });
      return response;
    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to fetch invoices');
    }
  };
  export const fetchClinicianNotes = async ({params}) => {
    try {
      const response = await BaseApi.get(`${clinicianNotesEndpoint}/${params.UUID? params.UUID : ""}`, {
        params: { client: params.clientId, appointment: params.appointmentId,
         },
      });
      return response;
    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to fetch invoices');
    }
  };
  export const fetchDntNotes = async ({params}) => {
    try {
      const response = await BaseApi.get(`${dntNotesEndpoint}/${params.UUID? params.UUID : ""}`, {
        params: { client: params.clientId, appointment: params.appointmentId,
         },
      });
      return response;
    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to fetch invoices');
    }
  };