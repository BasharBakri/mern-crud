import { useParams } from 'react-router-dom';
import { useRef, useState } from 'react';


export default function AddCredit() {
  const { id } = useParams();
  console.log(id);

  const inputRef = useRef(0);
  const [page, setPage] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseInt(inputRef.current.value) })
    };

    fetch(`http://localhost:5000/api/users/${id}/addCredit`, requestOptions)
      .then(response => console.log(response))
      .then(data => console.log(data))
      .catch(error => console.log("error", error));
    setTimeout(() => {

      setPage(prevState => !prevState);
    }, 500);
  }



  return (<>
    <br></br>
    <div> Add Credit to: {id}</div>
    <form onSubmit={handleSubmit}>
      <br></br>
      <label>
        Amount:
        <input type="text" ref={inputRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
    <span>{page}</span>
  </>);
}