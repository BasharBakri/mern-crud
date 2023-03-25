


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import User from './user/User';
import AddCredit from './user/AddCredit';
import Deposit from './user/Deposit';
import Transfer from './user/Transfer';
import Withdraw from './user/Withdraw';

import React from "react";
import Users from './users';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";




function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Go to bank users</h1>
          <Link to="/users">click here</Link>
        </div>
      ),
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/users/:id",
      element: <User />,
      children: [
        {
          path: "deposit",
          element: <Deposit />,
        },
        {
          path: "addCredit",
          element: <AddCredit />,
        },
        {
          path: "withdraw",
          element: <Withdraw />,
        },
        {
          path: "transfer",
          element: <Transfer />,
        },
      ],
    },
  ]);

  return (

    <div className="App">

      <RouterProvider router={router} />
    </div>

  );
}

export default App;
