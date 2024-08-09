import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Check from './pages/Check';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import 'dotenv/config'

function App() {
  const [user, setUser] = useState(null);

  // Check if the user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, []);

  // Handle successful login
  const handleSuccess = (response) => {
    const token = response.credential;
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);

    // Store JWT in localStorage
    localStorage.setItem('token', token);
  };

  // Handle login error
  const handleError = () => {
    console.error('Login failed');
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <><Dashboard user={user} /></> : <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
          <h1 className="text-2xl font-bold mb-6 text-white">Login with Google</h1>
          <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
      </div>
  </div>
    },
    {
      path: "/check",
      element: <><Check/></>
    }
  ]);

  return (
    <GoogleOAuthProvider clientId=process.env.GOOGLE_ID>
    <div>
      <RouterProvider router={router} />
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
