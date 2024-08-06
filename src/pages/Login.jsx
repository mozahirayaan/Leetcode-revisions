import { useState, useEffect } from 'react';
import React from 'react';

const Login = () => {
    const handleClick = () => {
        window.location.href = 'https://leetcode-revision.onrender.com/auth/google'; // Redirects user to OAuth provider
    };

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-6 text-white">Login with Google</h1>
                <button
                    onClick={handleClick}
                    className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}

export default Login;
