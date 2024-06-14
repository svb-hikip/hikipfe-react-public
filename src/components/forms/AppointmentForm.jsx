import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addPracticeAppointments, updatePracticeAppointments } from '../../apis/PracticeAPIs';
import { toast } from 'react-toastify';
import ModalTransitionWrapper from '../utils/ModalTransitionWrapper';
import { DateTimeField, RepeatableField, SwitchFormField, TextFormField } from './components/FormComps';
import PropTypes from 'prop-types';

function AppointmentForm({isOpen, setIsOpen, appointmentData, setAppointmentData}) {
    const isEditing = Boolean(appointmentData);

    const defaultStartDateTime = new Date();
    defaultStartDateTime.setMinutes(0, 0, 0);
    defaultStartDateTime.setHours(defaultStartDateTime.getHours() + 1);

    const [selectedDate, setSelectedDate] = useState(defaultStartDateTime.toISOString().slice(0,16));

    const {handleSubmit, register, control, formState: {errors}, setError, reset, setValue} = useForm({
        defaultValues: appointmentData || {
            client_name: '',
            clinician_name: '',
            start_datetime: selectedDate,
            duration: '',
            location_name: '',
            services_name: [],
            items_name: [],
            allDay: false
        }
    });

    const onSubmit = async (data) => {
        try {
            if(isEditing) {
                const response = await updatePracticeAppointments(data);
                appointmentData || setAppointmentData(response.data);
                toast.success('Appointment updated successfully!');
            } else {
                const response = await addPracticeAppointments(data);
                appointmentData || setAppointmentData(response.data);
                toast.success('Appointment added successfully!');
            }
            setIsOpen(false);
            reset(); //Reset form after submission
        } catch (error) {
            if(error.response && error.response.data) {
                const serverErrors = error.response.data;
                Object.keys(serverErrors).forEach((field) => {
                    const message = serverErrors[field];
                    setError(field, {type: 'server', message});
                });
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
    };

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setValue('start_datetime', arg.dateStr);
    }
  return (
    <ModalTransitionWrapper
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        actionButtons={[
            {label: isEditing ? 'Update' : 'Create', onClick: handleSubmit(onSubmit), className: 'rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'},
        ]}
    >
        <form onSubmit={handleSubmit(onSubmit)} className='flex-1 p-4'>
            <div className='mb-4'>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>{isEditing ? 'Edit Appointment' : 'Add Appointment'}</h2>
                <div className='mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                    <div className='sm:col-span-3'>
                        <TextFormField
                            label="Client Name"
                            placeholder="Enter Client Name"
                            register={register}
                            name="client_name"
                            error={errors?.client_name}
                        >
                            {errors?.client_name && <p className='text-red-500'>Client name is required.</p>}
                        </TextFormField>
                    </div>
                    <div className='sm:col-span-3'>
                        <TextFormField 
                            label="Clinician Name"
                            placeholder="Enter Clinician Name"
                            register={register}
                            name="clinician_name"
                            error={errors?.clinician_name}
                        >
                            {errors?.clinician_name && <p className='text-red-500'>Clinician name is required.</p>}
                        </TextFormField>
                    </div>
                    <div className='sm:col-span-3'>
                        <TextFormField
                            label="Duration"
                            placeholder="Duration"
                            register={register}
                            name="duration"
                            error={errors?.duration}
                        >
                            {errors?.duration && <p className='text-red-500'>Duration is required.</p>}
                        </TextFormField>
                    </div>
                    <div className='sm:col-span-3'>
                        <TextFormField 
                            label="Location"
                            placeholder="Location"
                            register={register}
                            name="location_name"
                            error={errors?.location_name}
                        >
                            {errors?.location_name && <p className='text-red-500'>Location is required</p>}
                        </TextFormField>
                    </div>
                    <div className='sm:col-span-6'>
                        <DateTimeField 
                            label="Start Date & Time"
                            register={register}
                            name="start_datetime"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            error={errors?.start_datetime}
                            handleDateClick={handleDateClick}
                        />
                    </div>
                    <div className='col-span-full'>
                        <label htmlFor="services_name" className="block text-sm font-medium leading-6 text-gray-900">
                            Services
                        </label>
                        <RepeatableField
                            label="Services"
                            control={control}
                            name="services_name"
                            errors={errors}
                            register={register}
                            renderField={({ index, register }) => (
                                <TextFormField
                                    label={`Service ${index + 1}`}
                                    placeholder="Enter Service"
                                    register={register}
                                    name={`services_name[${index}]`}
                                    error={errors?.services_name?.[index]}
                                />
                            )}
                        />
                    </div>
                    <div className='col-span-full'>
                        <label htmlFor="items_name" className="block text-sm font-medium leading-6 text-gray-900">
                            Items
                        </label>
                        <RepeatableField
                            label="Items"
                            control={control}
                            name="items_name"
                            errors={errors}
                            register={register}
                            renderField={({ index, register }) => (
                                <TextFormField
                                    label={`Item ${index + 1}`}
                                    placeholder="Enter Item"
                                    register={register}
                                    name={`items_name[${index}]`}
                                    error={errors?.items_name?.[index]}
                                />
                            )}
                        />
                    </div>
                    <div className='col-span-full'>
                        <SwitchFormField
                            label="All Day"
                            description="The appointment will scheduled for the whole day."
                            control={control}
                            name="allDay"
                        />
                    </div>
                </div>
            </div>
        </form>
    </ModalTransitionWrapper>
  );
}

AppointmentForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    setAppointmentData: PropTypes.func,
    appointmentData: PropTypes.object,
};

export default AppointmentForm;