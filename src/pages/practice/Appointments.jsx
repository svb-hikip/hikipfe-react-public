import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchPracticeAppointments } from '../../apis/PracticeAPIs';  // Adjust the import based on your project structure
import { fetchUserAttributes } from 'aws-amplify/auth';
import AppointmentForm from '../../components/appointments/AppointmentForm';
import AppointmentDetail from './AppointmentDetails';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAppointmentDetailOpen, SetIsAppointmentDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const calendarRef = useRef(null);

  const fetchAppointments = async (start, end) => {
    try {
      const attributes = await fetchUserAttributes();
      const appointments = await fetchPracticeAppointments({
        from: start.toISOString(),
        to: end.toISOString(),
        practiceId: attributes['custom:tenantId']
      });

      const formattedEvents = appointments.map(appointment => ({
        title: appointment.client_name,
        start: appointment.start_datetime,
        allDay: appointment.all_day,
        extendedProps: {
          clinician_name: appointment.clinician_name,
          location_name: appointment.location_name,
          services_names: appointment.services_names,
          items_names: appointment.items_names,
          duration: appointment.duration,
        }
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Failed to fetch appointments', error);
    }
  };



  const handleDatesSet = (dateInfo) => {
    fetchAppointments(dateInfo.start, dateInfo.end);
  };
  const handleEventClick = (info) => {
    setSelectedAppointment(info.event);
    SetIsAppointmentDetailOpen(true);
  }

  const closeDetail = () => {
    SetIsAppointmentDetailOpen(false);
    setSelectedAppointment(null);
  }

  const toggleForm = () => {
    setIsFormOpen(prevState => !prevState);
  }

  const handleFormSubmit = (appointment) => {
    console.log(appointment);
    toggleForm();
  }


  return (
    <div className="calendar-container">
<div className="flex justify-end">
<button onClick={toggleForm} className='mb-4 px-3 py-2 bg-indigo-600 text-white rounded-md'>
        {isFormOpen ? 'Close Form' : '+ Add Appointment'}
      </button>
      </div>
      {isFormOpen && <AppointmentForm onSubmit={handleFormSubmit} />}
      {!isFormOpen && 
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        height="auto"
        events={events}
        datesSet={handleDatesSet}
        // eventClick={(info) => {
        //   alert(`Clinician: ${info.event.extendedProps.clinician_name}\nClient: ${info.event.title}\nLocation: ${info.event.extendedProps.location_name}\nServices: ${info.event.extendedProps.services_names.join(', ')}\nItems: ${info.event.extendedProps.items_names.join(', ')}\nDuration: ${info.event.extendedProps.duration}`);
        // }}
        eventClick={handleEventClick}
      />
}
    </div>
  );
};

export default CalendarComponent;
