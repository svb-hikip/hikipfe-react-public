import { useLoaderData } from 'react-router-dom';
import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import classNames from '../../layout/dashboardComps/helper';

function ClientBills() {
    const data = useLoaderData();
    return ( <>
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((invoice) => (
        <li key={invoice.uuid} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {invoice.number}
              </p>
              <p className="text-sm leading-6 text-gray-800">
              {invoice.date}
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
              {invoice.clinician}: {invoice.location}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-x-4 sm:gap-x-6">
        <div className="flex items-center gap-x-6 sm:w-1/2 sm:flex-none">
            <div className="hidden sm:block">
            <p className="text-sm leading-6 text-gray-900">
                Amount: {invoice.aggregate_pre_tax_value}<br/>
                Tax: {invoice.aggregate_tax_value}<br/>
                Invoice Value: {invoice.total_value}
            </p>
            </div>
        </div>
        <div className="flex items-center gap-x-4 sm:w-1/2 sm:flex-none">
            <div className="hidden sm:block">
            <p className="text-sm leading-6 text-gray-900">
                Invoice Value: {invoice.total_value}<br/>
                Payment Recieved: {invoice.aggregate_payments_received}<br/>
                Pending:  {invoice.total_value}
            </p>
            </div>
        </div>
        </div>
          <div className="flex shrink-0 gap-x-6">
            <div className="sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
              <time dateTime={invoice.appointment_date}>
                {new Date(invoice.appointment_date).toLocaleString()}
              </time>
              </p>
                {/* <p className="mt-1 text-xs leading-5 text-gray-500">
                  Duration: hrs
                </p> */}
            </div>
            <Menu as="div" className="relative flex-none">
              <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        View profile<span className="sr-only">, {invoice?.clinician?.legal_first_name}</span>
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Message<span className="sr-only">, {invoice?.clinician?.legal_first_name}</span>
                      </a>
                    )}
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
    </> );
}

export default ClientBills;