import { useParams } from 'react-router-dom';

function AppointmentDetails() {
  const { id } = useParams();
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  const appointment = appointments[parseInt(id)];

  if (!appointment) {
    return <p>Appointment not found</p>;
  }

  return (
    <div>
      <h1>{appointment.clientName}</h1>
      <p>Type: {appointment.appointmentType}</p>
      <p>Date and Time: {new Date(appointment.dateTime).toLocaleString()}</p>
      <p>Duration: {appointment.duration} minutes</p>
      <p>Service: {appointment.service}</p>
      <p>Notes: {appointment.appointmentNotes}</p>
    </div>
  );
}

export default AppointmentDetails;
