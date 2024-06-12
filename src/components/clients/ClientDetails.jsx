
import { useLoaderData, NavLink } from "react-router-dom";
import classNames from "../layout/dashboardComps/helper";
import { Outlet } from "react-router-dom";


function ClientDetails() {
  const data = useLoaderData();
  const tabs = [

    { name: "Appointments", to: "appointments" },
    { name: "Bills", to: "bills" },
    { name: "Notes", to: "notes" },
    { name: "Files", to: "files" },

  ];

  return (
    <>

      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Client Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and Appointments
          </p>
        </div>
        <div className="mt-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2">
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                {data.contact.legal_first_name} {data.contact.legal_last_name} |{" "}
                {data.client_type} | {data.billing_type}
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Application for
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                Backend Developer
              </dd>
            </div>
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <ul>
                  {data.contact.contactemail_set.map((email, index) => (
                    <li key={index}>
                      {email.email} - Type: {email.type}, Permission to Contact:{" "}
                      {email.permission ? "Granted" : "Denied"}

                    </li>
                  ))}
                </ul>
              </dd>
            </div>

            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                <ul>
                  {data.contact.contactphone_set.map((item, index) => (
                    <li key={index}>
                      {item.phone_number} - Type: {item.type}, Voice:{" "}
                      {item.voice ? "Yes" : "No"}, Text:{" "}
                      {item.text ? "Yes" : "No"}

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

            defaultValue={tabs.find((tab) =>
              window.location.pathname.includes(tab.to)
            )}

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

          <nav
            className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
            aria-label="Tabs"
          >

            {tabs.map((tab, tabIdx) => (
              <NavLink
                key={tab.name}
                to={tab.to}

                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "text-indigo-700"
                      : "text-gray-400 hover:text-gray-700",
                    tabIdx === 0 ? "rounded-l-lg" : "",
                    tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                    "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                  )
                }

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
