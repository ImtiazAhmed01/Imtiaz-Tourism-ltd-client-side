import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Component/Home/Home'
import Root from './Component/Root'
import AuthProvider from './Component/Provider/authProvider'
import Register from './Component/Register/Register'
import ErrorPage from './Component/ErrorPage'
import Login from './Component/Login/Login'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import TouristDashboard from './Component/UserDashboard/TouristDashboard'
import PackageDetails from './Component/PackageDetails/PackageDetails'
import AllTripsPage from './Component/AllTripsPage/AllTripsPage'
import Community from './Component/Community/Community'
import AboutUsPage from './Component/AboutUsPage/AboutUsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/', element: <Home></Home>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: "/packages/:id",
        element: <PackageDetails></PackageDetails>
      },
      {
        path: '/alltirpspages',
        element: <AllTripsPage></AllTripsPage>
      },
      {
        path: '/community',
        element: <Community></Community>
      },
      {
        path: '/aboutus',
        element: <AboutUsPage></AboutUsPage>
      }
    ]
  },
  {
    path: "/dashboard/tourist",
    element: <ProtectedRoute allowedRoles={['tourist']}><TouristDashboard></TouristDashboard></ProtectedRoute>

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
