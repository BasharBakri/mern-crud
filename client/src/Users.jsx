import { useRef } from "react";
import User from "./user/User";
import axios from 'axios';
import BasicTable from "./BasicTable";
import {
  Link,
} from "react-router-dom";

function Users() {
  const inputRef = useRef(null);

  function handleSubmit(event) {
    async function postUser() {
      try {
        const response = await axios.post("http://localhost:5000/users/", { username: inputRef.current.value });
        console.log(response);
      } catch (error) {
        console.log("error", error);
      }
    }
    postUser();
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <p>Add a new user</p>
      <form onSubmit={handleSubmit}>
        <label>
          Add a new username:
          <input type="text" ref={inputRef} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>User table</p>
      <BasicTable />
    </div>
  );
}

export default Users;
