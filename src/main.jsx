import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

import Root, {loader as rootLoader, action as rootAction} from "./routes/root";
import ErrorPage from "./routes/error";
import Index from "./routes";
import LogIn, {action as logInAction} from "./routes/logIn";
import SignUp, {action as SignUpAction} from "./routes/signup";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    loader: rootLoader,
    action: rootAction,
    children:[
      {
        index: true,
        element: <Index></Index>
      },
      {
        path: "auth/logIn",
        element: <LogIn></LogIn>,
        action: logInAction,
      },{
        path: "auth/SignUp",
        element: <SignUp></SignUp>,
        action: SignUpAction,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);