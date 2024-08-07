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
    fetch('https://leetcode-revision.onrender.com/check-session', {
      method: 'GET',
      credentials: 'include'  // Send cookies with the request
    })
    .then(response => response.json())
    .then(data => {
      console.log("Response data:", data);
      if (data.user) {
        setIsAuthenticated(true);
        setUser(data.user);
        console.log(data.user);
      } else {
        setIsAuthenticated(false);
        console.log(data.user);
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
