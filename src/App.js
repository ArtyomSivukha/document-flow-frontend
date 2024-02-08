import { useCallback, useEffect, useState } from 'react';
import './App.css';

const userData = {
  "login": "Dimas",
  "password": "Dimas",
  "permission": null,
  "person": null
}

function App() {

  const [users, setUsers] = useState(null);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    fetch('http://localhost:8080/api/users')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setUsers(data)
      });
  };

  const addUser = () => {
    fetch('http://localhost:8080/api/users/addOne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    console.log(userData);
  }

  const [login, addLogin] = useState(null);
  const [password, addPassword] = useState(null);


  const handleSubmit = (e) => {
    let regObj = { login, password };
    console.log(regObj);
  }


  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={login} onChange={e => addLogin(e.target.value)} />
          <input type="text" name="name" value={password} onChange={e => addPassword(e.target.value)} />
        </form>
        <button onClick={addUser}>
          Activate Lasers
        </button>
      </div>
      <div>
        {users && users.map((user) => (
          <table>
            <tbody>
              <tr>
                <th>{user.id}</th>
                <td>{user.password}</td>
                <td>{user.login}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}

export default App;
