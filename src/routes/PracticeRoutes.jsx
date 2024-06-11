import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/PracticeDashboard';
import Appointments from '../pages/practice/Appointments';
import Billings from '../pages/practice/Billings';
import Analytics from '../pages/practice/Analytics';
import Settings from '../pages/practice/Settings';
import ClientDetails from '../components/clients/ClientDetails';
import { fetchClient,fetchDntNotes, fetchClinicianNotes, fetchProgressNotes } from '../apis/ClientAPIs';
import { fetchPracticeBills, fetchPracticeAppointments } from '../apis/PracticeAPIs';
import ClientAppointments from '../components/clients/clientDetailsComps/ClientAppointments';
import ClientNotes from '../components/clients/clientDetailsComps/ClientNotes';
import ClientFiles from '../components/clients/clientDetailsComps/ClientFiles';
import ClientBills from '../components/clients/clientDetailsComps/ClientBills';
import AppointmentDetails from '../pages/practice/AppointmentDetails';
import BillingDetail from '../pages/practice/BillingDetails';
import Loading from '../components/utils/Loading';
import Clients from '../pages/practice/Clients';

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
            element: <Navigate to="appointments" replace />
          },
          {
            path: "appointments",
            element: <ClientAppointments />,
            loader: fetchPracticeAppointments,
          },
          {
            path: "bills",
            element: <ClientBills />,
            loader: fetchPracticeBills,
          },
          {
            path: "notes",
            children: [
              {
                index: true,
                element: <Navigate to="progress" replace />, // Redirects /dashboard to /dashboard/clients
              },
              {
                path: "progress",
                element: <ClientNotes />,
                loader: fetchProgressNotes,
              },
              {
                path: "clinician",
                element: <ClientNotes />,
                loader: fetchClinicianNotes,
              },
              {
                path: "dnt",
                element: <ClientNotes />,
                loader: fetchDntNotes,
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
        loader: fetchPracticeAppointments,
      },
      {
        path: "billings",
        element: <Billings />,
        loader: fetchPracticeBills
      },
      {
        path: "billings/:invoiceId",
        element: <BillingDetail />,
        loader: fetchPracticeBills,
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