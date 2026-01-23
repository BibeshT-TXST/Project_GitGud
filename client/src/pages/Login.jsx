import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Topography from '@mui/material/Typography';
import TokenIcon from '@mui/icons-material/Token';
import myLogo from '../components/logo.png';
import mybook from '../components/books.svg';

const Login = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: value 
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        // Main container
        <div className = "min-h-screen flex flex-col">
            {/* --- Top Row: Logo Section --- */}
            <header className="w-full p-6 flex items-center shadow-md bg-[#363534] z-20">
                <div className="flex items-center gap-3">
                    <img src={myLogo} alt="Inventory Logo" className="h-15 w-auto object-contain" />
                </div>
            </header>
            {/* --- Middle Row: Login Form Section --- */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 bg-[#f5f1ee]">
                {/* Left Column: Image*/}
                <div className="hidden md:flex items-center justify-center bg-[#f5f1ee] p-10">
                    <img 
                    src={mybook}
                    alt="Login Visual" 
                    className="max-h-[500px]"
                    />
                </div>    
            </div>

        </div>
    );
};

export default Login;