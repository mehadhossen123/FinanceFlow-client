
import { createBrowserRouter } from "react-router";
import HomeLayout from "../LayOut/HomeLayout";
import Home from "../Pages/Home";
import AuthLayout from "../LayOut/AuthLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import AddTransaction from "../Pages/AddTransaction ";
import UpdateProfile from "../../UpdateProfile";
import MyTransaction from "../Pages/MyTransaction";
import Reports from "../Pages/Reports";
import Error from "../Components/Error";
import Details from "../Components/Details";


 const route = createBrowserRouter([
   {
     path: "/",
     element: <HomeLayout></HomeLayout>,
     children: [
       { index: true, path: "/", element: <Home></Home> },
       {
         path: "/addTransaction",
         element: (
           <PrivateRoutes>
             <AddTransaction></AddTransaction>
           </PrivateRoutes>
         ),
       },
       {
         path: "/myTransaction",
         element: (
           <PrivateRoutes>
             <MyTransaction></MyTransaction>
           </PrivateRoutes>
         ),
       },
       {
         path: "/reports",
         element: (
           <PrivateRoutes>
             <Reports></Reports>
           </PrivateRoutes>
         ),
       },
       {
         path: "/add/:id",
         element: (
           <PrivateRoutes>
             <Details></Details>
           </PrivateRoutes>
         ),
         loader: ({ params }) =>
           fetch(`https://finance-flow-phi-inky.vercel.app/add/${params.id}`),
       },
     ],
   },
   {
     path: "/auth",
     element: <AuthLayout></AuthLayout>,
     children: [
       {
         path: "/auth/login",
         element: <Login></Login>,
       },
       {
         path: "/auth/register",
         element: <Register></Register>,
       },
       {
         path: "/auth/update",
         element: (
           <PrivateRoutes>
             <UpdateProfile></UpdateProfile>
           </PrivateRoutes>
         ),
       },
     ],
   },
   {
     path: "/*",
     element: <Error></Error>,
   },
 ]);

export default route