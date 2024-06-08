import { useLoaderData } from 'react-router-dom';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import classNames from '../../layout/dashboardComps/helper';

function ClientAppointments() {
    const data = useLoaderData();
    return ( <>
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((appointment) => (
        <li key={appointment.uuid} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {appointment.clinician_name}
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                {appointment.location_name}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none">
            <div className="hidden sm:block">
              <p className="text-sm leading-6 text-gray-900">
              <ul className="list-outside">
                  {appointment.services_names.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </p>
              </div>
              </div>
          <div className="flex shrink-0 gap-x-6">
            <div className="sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
              <time dateTime={appointment.start_datetime}>
                {new Date(appointment.start_datetime).toLocaleString()}
              </time>
              </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Duration: {appointment.all_day ? appointment.duration : "All Day"}
                </p>
            </div>
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        View profile<span className="sr-only">, {appointment.clinician_name}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Message<span className="sr-only">, {appointment.clinician_name}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
    {JSON.stringify(data, null, 2)}
    </> );
}

export default ClientAppointments;