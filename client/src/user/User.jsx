import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { Link, useParams, Outlet } from 'react-router-dom';
import { useEffect } from 'react';


export default function User() {

  const { id } = useParams();

  useEffect(function () {
    async function getUser() {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getUser();
  }, []);




  return (<Card>
    <Card.Header>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link>
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
      <Link to="/users">Go Back to all users</Link>
      <Card.Title>Special title treatment</Card.Title>

      <Card.Text>
        With supporting text below as a natural lead-in to additional content.
      </Card.Text>

    </Card.Body>
  </Card>);
}