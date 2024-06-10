import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';

const AddAppointmentForm = ({onSubmit}) => {
    const [clientName, setClientsName] = useState('');
    const [clinicianName, setClinicianName] = useState('');
    const [location, setLocation] = useState('');
    const [services, setServices] = useState('');
    const [items, setItems] = useState('');
    const [duration, setDuration] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [allDay, setAllDay] = useState(false);

    const navigate = useNavigate();

    const handleDateSelect = (selectInfo) => {
        const {start, end, allDay} = selectInfo;
        setStartTime(start);
        setDuration((end - start) / (1000 * 60));
        setAllDay(allDay);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            clinician_name: clinicianName,
            client_name: clientName,
            location_name: location,
            services_name: services.split(',').map(service => service.trim()),
            items_name: items.split(',').map(item => item.trim()),
            duration,
            start_time: startTime ? startTime.toISOString() : '',
            all_day: allDay,
        });
        navigate('/dashboard/clients')
    }
  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
            <label htmlFor='client-name' className='block text-sm font-medium text-gray-700'>Client Name</label>
            <input type='text' id='client-name' value={clientName} 
                onChange={(e) => setClientsName(e.target.value)}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                required
            />
        </div>
        <div>
        <label htmlFor="clinician-name" className="block text-sm font-medium text-gray-700">
          Clinician Name
        </label>
        <input
          type="text"
          id="clinician-name"
          value={clinicianName}
          onChange={(e) => setClinicianName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="location-name" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location-name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="services-names" className="block text-sm font-medium text-gray-700">
          Services (comma separated)
        </label>
        <input
          type="text"
          id="services-names"
          value={services}
          onChange={(e) => setServices(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="items-names" className="block text-sm font-medium text-gray-700">
          Items (comma separated)
        </label>
        <input
          type="text"
          id="items-names"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Duration (minutes)
        </label>
        <input
          type="text"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="start-datetime" className="block text-sm font-medium text-gray-700">
          Start Date and Time
        </label>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          select={handleDateSelect}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height="auto"
        />
      </div>
      <div>
        <label htmlFor="all-day" className="block text-sm font-medium text-gray-700">
          All Day
        </label>
        <input
          type="checkbox"
          id="all-day"
          checked={allDay}
          onChange={(e) => setAllDay(e.target.checked)}
          className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end">
        <button type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add Appointment
        </button>
      </div>
    </form>
  )
}

export default AddAppointmentForm;