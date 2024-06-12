import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchPracticeAppointments } from '../../apis/PracticeAPIs';  // Adjust the import based on your project structure
import AppointmentDetail from '../../components/appointments/AppointmentCalendarDetail';
import AddAppointmentForm from '../../components/appointments/AddAppointmentForm';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAppointmentDetailOpen, SetIsAppointmentDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const calendarRef = useRef(null);

  const fetchAppointments = async (start, end) => {
    try {
      const response = await fetchPracticeAppointments({params:{
        from: start.toISOString(),
        to: end.toISOString(),
      }});

      const appointments = response.data
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

  return (
    <div className="calendar-container">
        <button onClick={toggleForm} className="flex justify-start items-start rounded-md mb-2 border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {isFormOpen ? 'Close Form' : 'Add Appointment'}
        </button>
        {isFormOpen && <AddAppointmentForm />}
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
        eventClick={handleEventClick}
      />
      {isAppointmentDetailOpen && <AppointmentDetail isOpen={isAppointmentDetailOpen} onClose={closeDetail} appointment={selectedAppointment} />}
    </div>
  );
};

export default CalendarComponent;
