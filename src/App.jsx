import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import dashboardRoutes from './routes/PracticeRoutes'; // Updated import path
import NotFound from './components/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />, // Redirect to the main dashboard route
  },
  ...dashboardRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <div className="App">
      <Authenticator>
        <ToastContainer />
        <RouterProvider router={router} />
      </Authenticator>
    </div>
  );
}

export default App;
