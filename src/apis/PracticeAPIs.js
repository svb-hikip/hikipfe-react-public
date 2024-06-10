import { BaseApi, handleApiError } from "./BaseAPI";
const practiceEndpoint = '/practice/practices';
const appointmentEndpoint = '/practice/appointments';
const billsEndpoint = '/practice/bills';


export const fetchPracticeAppointments = async ({ from, to, practiceId }) => {
    try {
      const response = await BaseApi.get(`${practiceEndpoint}/${practiceId}/appointments/`, {
        params: { from_date: from, to_date: to },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to fetch appointments');
    }
  };

  export const fetchPracticeBills = async ({practiceId }) => {
    try {
      const response = await BaseApi.get(`${practiceEndpoint}/${practiceId}/bills/`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to fetch appointments');
    }
  };

  export const fetchAppointmentDetail = async ({ params }) => {
    try {
      const response = await BaseApi.get(`${appointmentEndpoint}/${params.appointmentId}/`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to fetch appointments');
    }
  };

  export const fetchBillingDetail = async ({ params }) => {
    try {
      const response = await BaseApi.get(`${billsEndpoint}/${params.invoiceId}/`);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to fetch appointments');
    }
  };