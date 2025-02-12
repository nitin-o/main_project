
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom' // Make sure you have react-router-dom installed
import { Provider } from 'react-redux';
import store from './store/store'; // Correct the path if needed

import Home from './pages/Home.jsx';
import LoginForm from './pages/LoginForm.jsx';
import Sign_up from './pages/Sign_up.jsx';




const router = createBrowserRouter([
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Home />,
        },
        {
          path:"/profile",
          element:<Home/>
        },{
          path:"/login",
          element:<LoginForm/>

        },
        {
          path:"/sign_up",
          element:<Sign_up/>
        }











        ]
      }
    ]
  )




createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)




