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
import TourGuideDashboard from './Component/UserDashboard/TourGuideDashboard'
import AdminDashboard from './Component/UserDashboard/AdminDashboard'
import Layout2 from './Component/Layout2'
import TouristManageProfile from './Component/Tourist/TouristManageProfile'
import JoinAsTourGuide from './Component/Tourist/JoinAsTourGuide'

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
    path: '/',
    element: <Layout2></Layout2>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard/tourist",
        element: <ProtectedRoute allowedRoles={['Tourist']}><TouristDashboard></TouristDashboard></ProtectedRoute>
      },
      {
        path: '/dashboard/tourist/manageProfile',
        element: <TouristManageProfile></TouristManageProfile>
      },
      {
        path: '/dashboard/tourist/joinguide',
        element: <JoinAsTourGuide></JoinAsTourGuide>
      },
      {
        path: "dashboard/tourguide",
        element: <ProtectedRoute allowedRoles={['Tour Guide']}><TourGuideDashboard></TourGuideDashboard></ProtectedRoute>
      },
      {
        path: "dashboard/admin",
        element: <ProtectedRoute allowedRoles={['Admin']}><AdminDashboard></AdminDashboard></ProtectedRoute>
      }
    ]


  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
