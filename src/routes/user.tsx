import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  email: string;
  country: {
    name: string;
  }
  birthDate: string;
};

export default function User() {
  useEffect(() => {
    if (token) {
      getUser();
    } else {
      navigate('/sign-in');
    }
  }, []);

  async function getUser() {
    await fetch('https://api-tma-2024-production.up.railway.app/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(async response => ({
      response,
      data: await response.json()
    }))
    .then(({response, data}) => {
      console.log(data);

      if (response.status === 200) {
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
        navigate('/sign-in');
      }
    });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    navigate('/sign-in');
  }

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Country</th>
                <th>Birthdate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.email}</td>
                <td>{user.country.name}</td>
                <td>{user.birthDate.split('T')[0]}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
