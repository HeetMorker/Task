import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import AddTask from "./component/AddTask";
import Layout from "./component/Layout";
import ProtectedRoute from "./component/ProtectedRoute";
import PublicRoute from "./component/PublicRoute";
import ViewTask from "./component/ViewTask";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/register" element={<PublicRoute><Register /> </PublicRoute>}/>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/addTask" element={<AddTask />}/>
        <Route path="/viewTask" element={<ViewTask />}/>
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
