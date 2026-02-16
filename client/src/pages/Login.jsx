import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';
import myLogo from '../assets/logo.png';
import mybook from '../assets/books.svg';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Login = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const { login } = useAuth();
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!isLogin) {
            try {
                await api.post('/auth/signup', {
                    username: formData.username,
                    password: formData.password
                });
                setSuccessMessage("Signup successful! Please login.");
                setIsLogin(true);
            } catch (err) {
                if (err.response && err.response.status === 409) {
                    setError("User already exists. Please login.");
                    setIsLogin(true);
                } else {
                    setError("Signup failed. Please try again.");
                }
            } finally {
                setLoading(false);
            }
            return;
        }

        try {
            const response = await api.post('/auth/login', {
                username: formData.username,
                password: formData.password
            });
            const { token } = response.data;
            login(token);
            navigate('/landing');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Main container
        <div className="min-h-screen flex flex-col">
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
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <TextField
                                placeholder="Net ID"
                                variant="outlined"
                                name="username"
                                type="text"
                                fullWidth
                                required
                                value={formData.username}
                                onChange={handleChange}
                                disabled={loading}
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

                            <TextField
                                placeholder="Password"
                                variant="outlined"
                                name="password"
                                type="password"
                                fullWidth
                                required
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
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

                            <div className="flex justify-center">
                                <Button
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    disabled={loading}
                                    sx={{
                                        backgroundColor: '#363534',
                                        '&:hover': {
                                            backgroundColor: '#5c5a59',
                                        },
                                        textTransform: 'none',
                                        fontSize: '1.125rem',
                                        borderRadius: '0.5rem',
                                        fontWeight: 500,
                                        width: '200px'
                                    }}
                                >
                                   {loading ? (isLogin ? 'Signing in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError('');
                                        setSuccessMessage('');
                                    }}
                                    sx={{ textTransform: 'none' }}
                                >
                                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;