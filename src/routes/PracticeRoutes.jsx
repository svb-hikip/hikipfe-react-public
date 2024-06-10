import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/PracticeDashboard';
import Appointments from '../pages/practice/Appointments';
import Billings from '../pages/practice/Billings';
import Analytics from '../pages/practice/Analytics';
import Settings from '../pages/practice/Settings';
import ClientDetails from '../components/clients/ClientDetails';
import { fetchClient, fetchClientAppointments,
  fetchClientBills, fetchClientNotes } from '../apis/ClientAPIs';
import { fetchAppointmentDetail, fetchBillingDetail } from '../apis/PracticeAPIs';
import ClientAppointments from '../components/clients/clientDetailsComps/ClientAppointments';
import ClientNotes from '../components/clients/clientDetailsComps/ClientNotes';
import ClientFiles from '../components/clients/clientDetailsComps/ClientFiles';
import ClientBills from '../components/clients/clientDetailsComps/ClientBills';
import AppointmentDetails from '../pages/practice/AppointmentDetails';
import BillingDetail from '../pages/practice/BillingDetails';
import Loading from '../components/utils/Loading';

// lazy loading
const Clients = lazy(() => import('../pages/practice/Clients'));

const dashboardRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="clients" replace />, // Redirects /dashboard to /dashboard/clients
      },
      {
        path: "clients",
        element: (
          <Suspense fallback={<Loading />}>
            <Clients />
          </Suspense> 
        ),
      },
      {
        path: "clients/:clientId",
        element: <ClientDetails />,
        loader:fetchClient,
        children: [
          {
            index: true,
            element: <Navigate to="appointments" replace />, // Redirects /dashboard to /dashboard/clients
          },
          {
            path: "appointments",
            element: <ClientAppointments />,
            loader: fetchClientAppointments,
          },
          {
            path: "bills",
            element: <ClientBills />,
            loader: fetchClientBills,
          },
          {
            path: "notes",
            children: [
              {
                index: true,
                element: <Navigate to="progress" replace />, // Redirects /dashboard to /dashboard/clients
              },
              {
                path: ":noteType",
                element: <ClientNotes />,
                loader: fetchClientNotes,
              },
            ]
          },
          {
            path: "files",
            element: <ClientFiles />,
          },
        ]
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "appointments/:appointmentId",
        element: <AppointmentDetails />,
        loader: fetchAppointmentDetail,
      },
      {
        path: "billings",
        element: <Billings />,
      },
      {
        path: "billings/:invoiceId",
        element: <BillingDetail />,
        loader: fetchBillingDetail,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
];

export default dashboardRoutes;