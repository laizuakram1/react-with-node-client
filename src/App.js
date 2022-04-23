
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const formSubmit = event => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const usersNew = { name, email };

    // post data to server
    fetch('http://localhost:5000/users', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usersNew),
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data]
        setUsers(newUsers);
      })

  }
  return (
    <div className="App">
      <h2>welcome to web Developer Laizu</h2>
      <h3>users: {users.length} </h3>
      <ul>
        {
          users.map(user => <li key={user.id}>name: {user.name} email: {user.email}</li>)
        }
      </ul>



      <form onSubmit={formSubmit}>
        <input type="text" name="name" placeholder='Your Name' />
        <br />
        <input type="email" name="email" placeholder='Your email' />
        <br />
        <input type="submit" value="submit" />
      </form>

    </div>
  );
}

export default App;
