import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { Link, useParams, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function User() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(function () {
    async function getUser() {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        const data = await response.json();

        setUser(data.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getUser();
  }, []);




  return (<Card>
    <Link to="/users">Go Back to all users</Link>
    <Card.Header>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link disabled>
            <Link to={`/users/${id}`}>Info</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to={`/users/${id}/deposit`}>Deposit</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to="addCredit">Add Credit</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to="withdraw">Withdraw</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link to="transfer">Transfer</Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Card.Header>
    <Outlet />
    <Card.Body>
      <hr></hr>
      <Card.Title>Username:</Card.Title>
      <Card.Text>
        {user.username}
      </Card.Text>
      <Card.Subtitle className="mb-2 text-muted">Cash:  {user.cash}</Card.Subtitle>

      <Card.Subtitle className="mb-2 text-muted">Credit: {user.credit}</Card.Subtitle>

      <Card.Subtitle className="mb-2 text-muted">PassportId: {user.passportId}</Card.Subtitle>


    </Card.Body>
  </Card>);
}