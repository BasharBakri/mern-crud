
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

export default function Deposit() {
  const { id } = useParams();
  console.log(id);

  const inputRef = useRef(0);

  function handleSubmit(event) {

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseInt(inputRef.current.value) })
    };

    fetch(`http://localhost:5000/users/${id}/deposit`, requestOptions)
      .then(response => console.log(response))
      .then(data => console.log(data))
      .catch(error => console.log("error", error));
  }

  return (<>
    <br></br>
    <div> Deposit cash to: {id}</div>
    <form onSubmit={handleSubmit}>
      <br></br>
      <label>
        Amount:
        <input type="text" ref={inputRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  </>);
}