import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
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

                {/* Right Column: Login Form */}
                <div className="flex flex-col justify-center items-center bg-[#f5f1ee] p-8">
                    <div className="w-full max-w-sm">
                        <div className="mb-8 text-center">
                            <Typography variant="h4" component="h1" className="font-bold text-[#363534]-800">Login</Typography>
                        </div>

                        {/* Login Form */}
                        <form onSubmit ={handleSubmit} className="flex flex-col gap-6">
                            <TextField
                                placeholder ="Net ID"
                                variant="outlined"
                                name="username"
                                type ="text"
                                fullWidth
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="bg-white"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderWidth: '2.5px',
                                            borderColor: '#969696',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#363534',
                                        },
                                    },
                                }}
                            />
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;