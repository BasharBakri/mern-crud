import { useRef } from "react";
import { useParams } from "react-router-dom";

export default function Transfer() {
  const { id } = useParams();
  const inputRef = useRef(0);
  const idRef = useRef("");

  async function handleSubmit(event) {

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseInt(inputRef.current.value), username: idRef.current.value })
    };

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}/transfer`, requestOptions);
      const msg = await response.json();
      console.log(msg);
    } catch (error) {
      console.log(error);
    }
  }


  return (<>
    <br></br>
    <div> Transfer cash to another user: {id}</div>
    <form onSubmit={handleSubmit}>
      <br></br>
      <label>
        Amount:
        <input type="text" ref={inputRef} />
      </label>
      <label>
        username to transfer:
        <input type="text" ref={idRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  </>);
}