import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchPracticeAppointments } from './../../apis/PracticeAPIs';  // Adjust the import based on your project structure
import { fetchUserAttributes } from 'aws-amplify/auth';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
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

  return (
    <div className="calendar-container">
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
        eventClick={(info) => {
          alert(`Clinician: ${info.event.extendedProps.clinician_name}\nClient: ${info.event.title}\nLocation: ${info.event.extendedProps.location_name}\nServices: ${info.event.extendedProps.services_names.join(', ')}\nItems: ${info.event.extendedProps.items_names.join(', ')}\nDuration: ${info.event.extendedProps.duration}`);
        }}
      />
    </div>
  );
};

export default CalendarComponent;
