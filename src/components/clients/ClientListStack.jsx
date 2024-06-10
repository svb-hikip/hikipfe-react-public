import { useState, useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../loader/Loader';

export default function ClientListStack() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    // Assuming you have a function fetchAppointmentsData that fetches appointments
    const fetchAppointmentsData = async () => {
      setIsLoading(true);
      try {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(storedAppointments);
        setAppointmentCount(storedAppointments.length);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointmentsData();
  }, []);

  const loadMoreClients = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader />}

      <span>{appointmentCount} Clients</span>
      <InfiniteScroll loadMore={loadMoreClients} hasMore={hasMore}>
        <ul role="list" className="divide-y divide-gray-200 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-4">
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            appointments.map((appointment, index) => (
              <li key={index} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {appointment.clientName}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {appointment.appointmentType}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {new Date(appointment.dateTime).toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Duration: {appointment.duration} minutes
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Service: {appointment.service}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Notes: {appointment.appointmentNotes}
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </InfiniteScroll>
    </>
  );
}
