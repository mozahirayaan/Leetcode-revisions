import { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { jwtDecode } from "jwt-decode";




function Check() {
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

  return (
    <GoogleOAuthProvider clientId="952138734571-e4n7dh3ck2e3iuriba1kiijm247tbgl8.apps.googleusercontent.com">
      <div className="App">
        {user ? (
          <div>
            <h2>Welcome, {user.email}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default Check;
