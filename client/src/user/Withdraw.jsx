import { useRef } from "react";
import { useParams } from "react-router-dom";

export default function Withdraw() {
  const { id } = useParams();

  const inputRef = useRef(0);

  function handleSubmit(event) {

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseInt(inputRef.current.value) })
    };

    fetch(`http://localhost:5000/users/${id}/withdraw`, requestOptions);
  }

  return (<>
    <br></br>
    <div> withdraw cash then credit: {id}</div>
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