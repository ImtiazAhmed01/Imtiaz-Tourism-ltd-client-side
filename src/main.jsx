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
import MyBooking from './Component/Tourist/MyBooking'
import Payment from './Component/Tourist/Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import AddStories from './Component/Tourist/AddStories'
import ManageStories from './Component/Tourist/ManageStories'
import StoryEdit from './Component/Tourist/StoryEdit'
import GuideProfile from './Component/TourGuide/GuideProfile'
import AddPackage from './Component/Admin/AddPackage'
import ManageUsers from './Component/Admin/ManageUsers'
import ManageCandidate from './Component/Admin/ManageCandidate'
import MyAssignedTours from './Component/Tour Guide/MyAssignedTours'
import StoriesTG from './Component/Tour Guide/StoriesTG'

const stripePromise = loadStripe('pk_test_51QjKgaAwC1fImaEQKbRyeHqq3iw3ufeIP1FU4awqUbJeavujVfjrOmIsnFtx5Rb98KteM18htlYTO4caZztCMqkA00G1ifOgo6');

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
        path: '/guideProfile/:id',
        element: <GuideProfile></GuideProfile>
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

        path: "/payment/:id",
        element: <Payment></Payment>

      },
      {
        path: '/dashboard/tourist/myBookings',
        element: <MyBooking></MyBooking>
      },
      {
        path: '/addstories',
        element: <AddStories></AddStories>
      },
      {
        path: '/manage-stories',
        element: <ManageStories></ManageStories>
      },
      {
        path: '/edit-story/:id',
        element: <StoryEdit></StoryEdit>
      },
      {
        path: "dashboard/tourguide",
        element: <ProtectedRoute allowedRoles={['Tour Guide']}><TourGuideDashboard></TourGuideDashboard></ProtectedRoute>
      },
      {
        path: "dashboard/tourguide/assignedtour",
        element: <MyAssignedTours></MyAssignedTours>
      },
      {
        path: 'dashboard/tourguide/stories',
        element: <StoriesTG></StoriesTG>
      },
      {
        path: "dashboard/admin",
        element: <ProtectedRoute allowedRoles={['Admin']}><AdminDashboard></AdminDashboard></ProtectedRoute>
      },
      {
        path: 'dashboard/admin/addpackage',
        element: <AddPackage></AddPackage>
      },
      {
        path: 'dashboard/admin/manageusers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'dashboard/admin/managecandidate',
        element: <ManageCandidate></ManageCandidate>
      }
    ]


  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router}></RouterProvider>
      </Elements>
    </AuthProvider>
  </StrictMode>,
)
