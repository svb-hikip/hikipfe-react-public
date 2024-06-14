import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { deletePracticeAppointments } from '../../../apis/PracticeAPIs';
import NoResultsFound from '../../../components/utils/NoResultFound';
import classNames from '../../layout/dashboardComps/helper';

function ClientAppointments() {
    const response = useLoaderData();
    const [data, setData] = useState(response.data);

    const handleDelete = async (uuid) => {
        await deletePracticeAppointments(uuid);
        setData(data.filter((item) => item.uuid !== uuid));
    };

    return (
        <>
            {data.length === 0 ? (
                <NoResultsFound
                    title="No Appointments Found"
                    message="Sorry, we could not find any appointments for this client"
                />
            ) : (
                <ul role="list" className="divide-y divide-gray-200">
                    {data.map((appointment) => (
                        <li key={appointment.uuid} className="flex justify-between gap-x-6 py-5">
                            <div className="flex items-center gap-x-4 w-full">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {appointment.clinician_name}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {appointment.location_name}
                                    </p>
                                    <ul className="mt-2 text-sm text-gray-900 list-disc list-inside">
                                        {appointment.services_name.map((service, index) => (
                                            <li key={index}>{service}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-sm text-gray-900">
                                        <time dateTime={appointment.start_datetime}>
                                            {new Date(appointment.start_datetime).toLocaleString()}
                                        </time>
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Duration: {appointment.all_day ? "All Day" : `${appointment.duration} hrs`}
                                    </p>
                                </div>
                                <Menu as="div" className="relative flex-none">
                                    <MenuButton className="p-2 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">Open options</span>
                                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                    </MenuButton>
                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                            <MenuItem>
                                                {({ active }) => (
                                                    <Link
                                                        to={`/dashboard/appointments/${appointment.uuid}`}
                                                        className={classNames(
                                                            active ? 'bg-gray-50' : '',
                                                            'block px-3 py-1 text-sm text-gray-900'
                                                        )}
                                                    >
                                                        More Details<span className="sr-only">, {appointment.clinician_name}</span>
                                                    </Link>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ active }) => (
                                                    <button
                                                        className={classNames(
                                                            active ? 'bg-red-50' : '',
                                                            'block w-full px-3 py-1 text-left text-sm text-gray-900'
                                                        )}
                                                        onClick={() => handleDelete(appointment.uuid)}
                                                    >
                                                        Delete<span className="sr-only">, {appointment.clinician_name}</span>
                                                    </button>
                                                )}
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default ClientAppointments;
