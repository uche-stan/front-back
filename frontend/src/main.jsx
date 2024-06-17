import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AuthProvider from './context/AuthProvider.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:  <App />,
    errorElement: <h1>Error Page</h1>,
    children: [

      {
        index: true,
        element: <HomePage />,
      }
    ],

    
  },

  {
    path: 'register',
    element: <RegisterPage />
  },

  {
    path: 'login',
    element: <LoginPage />
  },

  {
    path: 'dashboard',
    element: <DashboardPage />
  },
  // {
  //   path: 'profile/:edit',
  //   element: <UpdateProfile />
  // },

  
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
