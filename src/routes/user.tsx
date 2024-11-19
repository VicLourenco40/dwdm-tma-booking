import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, []);

  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('token');


  return (
    <>
      <h1>User</h1>
    </>
  );
}
