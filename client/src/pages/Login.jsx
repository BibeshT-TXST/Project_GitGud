import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Topography from '@mui/material/Typography';
import TokenIcon from '@mui/icons-material/Token';
import myLogo from '../components/logo.png';

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
        </div>
    );
};

export default Login;