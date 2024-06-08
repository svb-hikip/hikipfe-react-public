import { RouterProvider } from 'react-router-dom';
import router from './router'; 
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(outputs);

function App() {
  return (
    <div className="App">
      {/* Other components and context providers can be included here */}
      <Authenticator>
      <RouterProvider router={router}>
        {/* Your route components will be injected here by the router */}
      </RouterProvider>
      </Authenticator>
    </div>
  );
}


export default App;