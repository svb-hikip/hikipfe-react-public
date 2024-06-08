import { BaseApi, handleApiError } from "./BaseAPI";
const practiceEndpoint = '/practice/practices';



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