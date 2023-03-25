import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



function BasicTable() {
  const [users, setUsers] = useState([]);

  useEffect(function () {
    async function getUsers() {
      try {
        const response = await fetch("http://localhost:5000/users/");
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getUsers();
  }, []);

  console.log(users);

  const userTable = users.map((user) => {
    return (<tr key={user._id}>

      <td>{user.username}</td>
      <td>{user.cash}</td>
      <td>{user.credit}</td>
      <td>{user.passportId}</td>
      <td><Link to={`/users/${user._id}`}>view user and do operations</Link></td>
    </tr>);
  });

  return (<Table striped bordered hover>
    <thead>
      <tr>
        <th>username</th>
        <th>cash</th>
        <th>credit</th>
        <th>passportId</th>
        <th>view details</th>
      </tr>
    </thead>
    <tbody>
      {userTable}
    </tbody>
  </Table>
  );
}

export default BasicTable;