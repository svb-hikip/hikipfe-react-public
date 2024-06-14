import React from 'react'

const AppointmentDetail = ({isOpen, onClose, appointment}) => {
    if( !isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-lg font-semibold">Appointment Details</h3>
        </div>
        <div className="mt-2">
          <p><strong>Clinician:</strong> {appointment.clinician_name}</p>
          <p><strong>Client:</strong> {appointment.client_name}</p>
          <p><strong>Location:</strong> {appointment.location_name}</p>
          <p><strong>Services:</strong> {appointment.services_name ? appointment.services_name.join(', ') : 'N/A'}</p>
          <p><strong>Items:</strong> {appointment.items_name ? appointment.items_name.join(', ') : 'N/A'}</p>
          <p><strong>Duration:</strong> {appointment.duration}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
};

export default AppointmentDetail;