import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secret from "../pages/Shared/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AdminPayments from "../pages/Dashboard/AdminFoodPayments/AdminFoodPayments";
import AddReview from "../pages/Dashboard/AddReview/AddReview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/menu",
        element: <Menu />
      },
      {
        path: "/order/:category",
        element: <Order />
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "signup",
        element: <SignUp></SignUp>
      },
      {
        path: "secret",
        element: <PrivateRoute><Secret></Secret></PrivateRoute>
      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      // normal user routes
      {
        path: 'userHome',
        element: <UserHome />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'payment',
        element: <Payment />,
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory />,
      },
      {
        path: 'addReview',
        element: <AddReview />,
      },

      // admin routes
      {
        path: 'adminHome',
        element: <AdminRoute><AdminHome /></AdminRoute>,
      },
      {
        path: 'addItems',
        element: <AdminRoute><AddItems /></AdminRoute>,
      },
      {
        path: 'adminFoodPayments',
        element: <AdminRoute><AdminPayments /></AdminRoute>,
      },
      {
        path: 'manageItems',
        element: <AdminRoute><ManageItems /></AdminRoute>,
      },
      {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItem /></AdminRoute>,
        loader: ({ params }) => fetch(`https://food-family-res.onrender.com//menu/${params.id}`)
      },
      {
        path: 'users',
        element: <AdminRoute><AllUsers /></AdminRoute>,
      },

    ]
  }
]);
