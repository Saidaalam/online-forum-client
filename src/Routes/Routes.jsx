import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import AddAnnouncement from "../pages/Announcement/AddAnnouncement";
import Login from "../pages/JoinUs/Login";
import Register from "../pages/Register/Register";
import Announcements from "../pages/Home/Announcements";
import PostDetails from "../pages/PostDetails";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../assets/Dashboard/MyProfile";
import AddPost from "../assets/Dashboard/AddPost";
import MyPosts from "../assets/Dashboard/MyPosts";
import PostComment from "../pages/PostComment";
import Payment from "../pages/Membership/Payment";
import SingleUser from "../assets/Dashboard/SingleUser";
import AdminProfile from "../assets/Dashboard/AdminProfile";
import ManageUser from "../assets/Dashboard/ManageUser";
import ReportedComments from "../assets/Dashboard/ReportedComments";
import PrivateRoutes from "./PrivateRoute";
  
 export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path : '/',
            element: <Home></Home>,
            loader : () => fetch('https://online-forum-server-coral.vercel.app/announcements')
        },
        {
          path : '/Announcement',
          element: <AddAnnouncement></AddAnnouncement>
        },
        {
          path : '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
      },
      {
        path: '/announcements',
        element: <Announcements></Announcements>,
      },
      {
        path: '/singleUser',
        element: <SingleUser></SingleUser>
      },
      {
        path: '/membership',
        element: <PrivateRoutes><Payment/></PrivateRoutes>,
      },
      {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard/></PrivateRoutes>,
      },
      {
        path: '/user/:id',
        element: <MyProfile></MyProfile>,
        loader: ({params}) => fetch(`https://online-forum-server-coral.vercel.app/user/${params.id}`)
      },
      {
        path: '/addPost',
        element: <AddPost></AddPost>,
      },
      {
        path: '/myPost',
        element: <MyPosts></MyPosts>,
      },
      {
        path: '/manageUser',
        element: <ManageUser></ManageUser>,
      },
      {
        path: '/comments',
        element: <ReportedComments></ReportedComments>,
      },
      {
        path: '/adminProfile',
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "/PostComment/:id",
        element: <PostComment />,
        loader: ({params}) => fetch(`https://online-forum-server-coral.vercel.app/posts/${params.id}`)
      },
      {
        path:'/post/:id',
        element: <PostDetails></PostDetails>
      }
      ]
    },
  ]);
  