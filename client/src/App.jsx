import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import Users from './users';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Go to bank users</h1>
          <Link to="users">click here </Link>
        </div>
      ),
    },
    {
      path: "users",

      element: <Users />,
    },
  ]);

  return (
    <div className="App">

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
