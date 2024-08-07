import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/check-session', { withCredentials: true })
      .then(response => {
        console.log("Response data:", response.data);
        if (response.data.user) {
          setIsAuthenticated(true);
          setUser(response.data.user);
          console.log(user);
        } else {
          setIsAuthenticated(false);
          console.log(user);
        }
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setIsAuthenticated(false);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <><Dashboard user={user} /></> : <Login />
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
