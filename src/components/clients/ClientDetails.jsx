import { useLoaderData, NavLink, Outlet } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import classNames from '../layout/dashboardComps/helper';

function ClientDetails() {
  const data = useLoaderData();
  const tabs = [
    { name: 'Appointments', to: 'appointments' },
    { name: 'Bills', to: 'bills' },
    { name: 'Notes', to: 'notes' },
    { name: 'Files', to: 'files' },
  ];

  return (
    <>
      <div className="p-6 bg-white shadow-lg rounded-lg mb-6">
        <div className="px-4 sm:px-0">
          <h3 className="text-xl font-semibold leading-7 text-gray-900">Client Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and Appointments</p>
        </div>
        <div className="mt-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-0 hover:bg-gray-50 rounded-lg">
              <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <span className="font-semibold">{data.contact.legal_first_name} {data.contact.legal_last_name}</span>
                <span className="ml-2 inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{data.client_type}</span>
                <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{data.billing_type}</span>
              </dd>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-0 hover:bg-gray-50 rounded-lg">
              <dt className="text-sm font-medium leading-6 text-gray-900">Relationship</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                {data.contact.relationship}
              </dd>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-0 hover:bg-gray-50 rounded-lg">
              <dt className="text-sm font-medium leading-6 text-gray-900">Client Portal Access</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${data.contact.client_portal_access ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {data.contact.client_portal_access ? 'Granted' : 'Denied'}
                </span>
              </dd>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-0 hover:bg-gray-50 rounded-lg">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <ul>
                  {data.contact.contactemail_set.map((email, index) => (
                    <li key={index} className="flex items-center mb-1">
                      <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-2" />
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
            <div className="border-t border-gray-200 px-4 py-6 sm:px-0 hover:bg-gray-50 rounded-lg">
              <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <ul>
                  {data.contact.contactphone_set.map((item, index) => (
                    <li key={index} className="flex items-center mb-1">
                      <PhoneIcon className="h-5 w-5 text-gray-500 mr-2" />
                      {item.phone_number} -
                      <span className="ml-1 inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{item.type}</span>
                      {/* Adding the voice and text as : check what all data the API is fetching and Add more client data to the details page */}
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
        </div>
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
              window.location.href = e.target.value; // This will trigger a route change in React Router
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
      <Outlet />
    </>
  );
}

export default ClientDetails;
