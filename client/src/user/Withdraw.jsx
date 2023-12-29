import { useRef } from "react";
import { useParams, Form } from "react-router-dom";

export default function Withdraw() {
  const { id } = useParams();

  const inputRef = useRef(0);

  function handleSubmit(event) {
    // event.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseInt(inputRef.current.value) })
    };

    fetch(`http://localhost:5000/api/users/${id}/withdraw`, requestOptions).then((res) => res.json()).then((res) => {
      console.log(res);
    });
  }

  return (<>
    <br></br>
    <div> withdraw cash then credit: {id}</div>
    <form method="post" onSubmit={handleSubmit}>
      <br></br>
      <label>
        Amount:
        <input type="text" ref={inputRef} />
      </label>
      <button type="submit">Submit</button>
    </form>

  </>);



}