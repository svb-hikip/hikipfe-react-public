import { BaseApi, handleApiError } from "./BaseAPI";
const appointmentEndpoint = '/practice/appointments';
const billsEndpoint = '/practice/invoices';


export const fetchPracticeAppointments = async ({params}) => {
    try {
      const response = await BaseApi.get(`${appointmentEndpoint}/${params.appointmentId? params.appointmentId : ""}`, {
        params: { start_datetime_after: params.from, start_datetime_before: params.to,
          client:params.clientId
         },
      });
      return response;
    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to fetch appointments');
    }
  };

  
  export const fetchPracticeBills = async ({params}) => {
    try {
      const response = await BaseApi.get(`${billsEndpoint}/${params.invoiceId? params.invoiceId : ""}`, {
        params: { client: params.clientId, appointment: params.appointmentId,
         },
      });
      console.log(response, "ss");
      return response;

    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to fetch invoices');
    }
  };