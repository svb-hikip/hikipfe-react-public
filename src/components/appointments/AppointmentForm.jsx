import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const AppointmentForm = () => {
    const [clientName, setClientsName] = useState('');
    const [appointmentType, setAppointmentType] = useState('');
    const [dateTime, setDateTime] = useState(null);
    const [duration, setDuration] = useState('');
    const [service, setService] = useState('');
    const [appointmentNotes, setAppointmentNotes] = useState('');

    const handleDateSelect = (selectInfo) => {
        const { start } = selectInfo;
        setDateTime(start);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const appointmentData = {
            clientName,
            appointmentType,
            dateTime,
            duration,
            service,
            appointmentNotes,
        };

        // Store in local storage
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        storedAppointments.push(appointmentData);
        localStorage.setItem('appointments', JSON.stringify(storedAppointments));

        navigate('/dashboard/clients');

    };

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
                <label htmlFor='client-name' className='block text-sm font-medium text-gray-700'>Client Name</label>
                <input
                    type='text'
                    id='client-name'
                    value={clientName}
                    onChange={(e) => setClientsName(e.target.value)}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    required
                />
            </div>
            <div>
                <label htmlFor="appointment-type" className="block text-sm font-medium text-gray-700">
                    Appointment Type
                </label>
                <input
                    type="text"
                    id="appointment-type"
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="date-time" className="block text-sm font-medium text-gray-700">
                    Date and Time
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
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                    Service
                </label>
                <input
                    type="text"
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="appointment-notes" className="block text-sm font-medium text-gray-700">
                    Appointment Notes
                </label>
                <textarea
                    id="appointment-notes"
                    value={appointmentNotes}
                    onChange={(e) => setAppointmentNotes(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows="4"
                ></textarea>
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button>
            </div>
        </form>
    )
}
export default AppointmentForm;
