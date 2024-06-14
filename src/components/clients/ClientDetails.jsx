import { useLoaderData, NavLink, Outlet, useNavigate } from 'react-router-dom';
import classNames from '../layout/dashboardComps/helper';
import ClientForm from '../forms/ClientForm';
import { useState } from 'react';

function ClientDetails() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState(data);
  const [isSideOverOpen, setIsSideOverOpen] = useState(false);
  const tabs = [
    { name: 'Appointments', to: 'appointments' },
    { name: 'Bills', to: 'bills' },
    { name: 'Notes', to: 'notes' },
    { name: 'Files', to: 'files' },
  ];

  return (
    <>
      <div key={clientData} className="p-6 bg-white shadow-lg rounded-lg mb-6">
        <div className="px-4 sm:px-0">
          <h3 className="text-xl font-semibold leading-7 text-gray-900">Client Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and Appointments</p>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="mt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-1 gap-3">
              <div className="border-t border-gray-200 px-4 py-3 sm:px-0 hover:bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  <span className="font-semibold">{clientData.contact.legal_first_name} {clientData.contact.legal_last_name}</span>
                  <span className="ml-2 inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{clientData.client_type}</span>
                  <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{clientData.billing_type}</span>
                </dd>
              </div>
              <div className="border-t border-gray-200 px-4 py-3 sm:px-0 hover:bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium leading-6 text-gray-900">Client Portal Access</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${clientData.contact.client_portal_access ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {clientData.contact.client_portal_access ? 'Granted' : 'Denied'}
                  </span>
                </dd>
              </div>
              <div className="border-t border-gray-200 px-4 py-3 sm:px-0 hover:bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  <ul>
                    {clientData.contact.contactemail_set.map((email, index) => (
                      <li key={index} className="flex items-center mb-1">
                        <svg
                          data-slot="icon"
                          fill="none"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="h-5 w-5 text-green-500 mr-2"
                        >
                          <path
                            strokeLinecap="flat"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                        {email.email} -
                        <span className="ml-1 inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{email.type}</span>
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${email.permission ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {email.permission ? 'Granted' : 'Denied'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="border-t border-gray-200 px-4 py-3 sm:px-0 hover:bg-gray-50 rounded-lg">
                <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  <ul>
                    {clientData.contact.contactphone_set.map((item, index) => (
                      <li key={index} className="flex items-center mb-1">
                        <svg
                          data-slot="icon"
                          fill="none"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="h-4.2 w-5 text-red-400 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                          />
                        </svg>
                        {item.phone_number} -
                        <span className="ml-1 inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{item.type}</span>
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${item.voice ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          Voice: {item.voice ? 'Yes' : 'No'}
                        </span>
                        <span className={`ml-1 inline-block px-2 py-0.5 text-xs font-medium rounded ${item.text ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          Text: {item.text ? 'Yes' : 'No'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <button
              className="mt-4 inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 text-sm font-medium rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              onClick={() => setIsSideOverOpen(true)}
            >
              Edit
            </button>
          </div>
          <div className="mt-6">
            <div className="border-t border-gray-200 px-4 py-3 sm:px-0 hover:bg-gray-50 rounded-lg">
              <dt className="text-sm font-medium leading-6 text-gray-900">Adam Sandler | Relation: Son</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <ul>
                  {clientData.contact.contactphone_set.map((item, index) => (
                    <li key={index} className="flex items-center mb-1">
                      <svg
                          data-slot="icon"
                          fill="none"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="h-4.2 w-5 text-red-400 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                          />
                        </svg>
                      {item.phone_number} -
                      <span className="ml-1 inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{item.type}</span>
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${item.voice ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        Voice: {item.voice ? 'Yes' : 'No'}
                      </span>
                      <span className={`ml-1 inline-block px-2 py-0.5 text-xs font-medium rounded ${item.text ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        Text: {item.text ? 'Yes' : 'No'}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <ul>
                  {clientData.contact.contactemail_set.map((email, index) => (
                    <li key={index} className="flex items-center mb-1">
                      <svg
                          data-slot="icon"
                          fill="none"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="h-5 w-5 text-green-500 mr-2"
                        >
                          <path
                            strokeLinecap="flat"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                      {email.email} -
                      <span className="ml-1 inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{email.type}</span>
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${email.permission ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {email.permission ? 'Granted' : 'Denied'}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="border-t border-gray-200 px-4 py-3 sm:px-0 hover:bg-gray-50 rounded-lg">
              <dt className="text-sm font-medium leading-6 text-gray-900">Sunny Leon | Relation: Daughter</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <ul>
                  {clientData.contact.contactphone_set.map((item, index) => (
                    <li key={index} className="flex items-center mb-1">
                      <svg
                          data-slot="icon"
                          fill="none"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="h-4.2 w-5 text-red-400 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                          />
                        </svg>
                      {item.phone_number} -
                      <span className="ml-1 inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{item.type}</span>
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${item.voice ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        Voice: {item.voice ? 'Yes' : 'No'}
                      </span>
                      <span className={`ml-1 inline-block px-2 py-0.5 text-xs font-medium rounded ${item.text ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        Text: {item.text ? 'Yes' : 'No'}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <ul>
                  {clientData.contact.contactemail_set.map((email, index) => (
                    <li key={index} className="flex items-center mb-1">
                      <svg
                          data-slot="icon"
                          fill="none"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="h-5 w-5 text-green-500 mr-2"
                        >
                          <path
                            strokeLinecap="flat"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                      {email.email} -
                      <span className="ml-1 inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{email.type}</span>
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${email.permission ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {email.permission ? 'Granted' : 'Denied'}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <button
              className="mt-4 inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 text-sm font-medium rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              onClick={() => { }}
            >
              Add Contact
            </button>
          </div>
        </dl>
      </div>

      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue={tabs.find(tab => window.location.pathname.includes(tab.to))}
            onChange={(e) => {
              navigate(e.target.value); // This will trigger a route change in React Router
            }}
          >
            {tabs.map((tab) => (
              <option key={tab.name} value={tab.to}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
            {tabs.map((tab, tabIdx) => (
              <NavLink
                key={tab.name}
                to={tab.to}
                className={({ isActive }) => classNames(
                  isActive ? 'text-indigo-700' : 'text-gray-400 hover:text-gray-700',
                  tabIdx === 0 ? 'rounded-l-lg' : '',
                  tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                  'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
                )}
              >
                <span>{tab.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <ClientForm isOpen={isSideOverOpen} setIsOpen={setIsSideOverOpen} clientData={clientData} updateClientData={setClientData} />
      <Outlet />
    </>
  );
}

export default ClientDetails;
