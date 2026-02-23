import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';
import myLogo from '../assets/logo.png';
import mybook from '../assets/asset19.svg';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Login = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [signupSuccess, setSignupSuccess] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear field error as user edits
        if (usernameError) setUsernameError('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setUsernameError('');

        if (!isLogin) {
            try {
                await api.post('/auth/signup', {
                    username: formData.username,
                    password: formData.password
                });
                // Show Thank-you panel rather than immediately switching back
                setSignupSuccess(true);
            } catch (err) {
                if (err.response && err.response.status === 409) {
                    setUsernameError("This Net-ID already has an account, Please try a different one.");
                } else {
                    setUsernameError("Signup failed. Please try again.");
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
        } catch (err) {
            console.error('Login failed:', err);
            setUsernameError('Incorrect Net-ID or password');
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

                {/* Right Column: Login/Signup Form and thank you pannel conditional*/}
                <div className="flex flex-col justify-center items-center bg-[#f5f1ee] p-8">
                {signupSuccess ? (
                    /*Thank you panel, activated after successful signup*/
                    <div className="w-full max-w-sm flex flex-col items-center gap-4 text-center">
                        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: '#363534' }}>
                                Thank you for signing up!
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#5c5a59' }}>
                                Head back to login
                        </Typography>
                        <Button
                                variant="contained"
                                size="large"
                                onClick={() => {
                                    // Reset to login form — no page reload
                                    setSignupSuccess(false);
                                    setIsLogin(true);
                                    setFormData({ username: '', password: '' });
                                    setUsernameError('');
                                }}
                                sx={{
                                    backgroundColor: '#363534',
                                    '&:hover': { backgroundColor: '#5c5a59' },
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    borderRadius: '0.5rem',
                                    fontWeight: 500,
                                    width: '160px',
                                    mt: 1,
                                }}
                            >
                                Log In
                            </Button>
                    </div>
                ) : (
                    /* Login/Signup form*/
                    <div className="w-full max-w-sm">
                        <div className="mb-8 text-center">
                            <Typography variant="h4" component="h1" className="font-bold text-[#363534]-800">{isLogin ? 'Login' : 'Sign Up'}</Typography>
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
                                error={!!usernameError}
                                helperText={usernameError}
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
                                    '& .MuiFormHelperText-root': {
                                        backgroundColor: '#F5F1EE ',
                                        margin: 0,
                                        padding: '2px 14px',
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
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setUsernameError('');
                                        setSuccessMessage('');
                                    }}
                                    sx={{ textTransform: 'none' }}
                                >
                                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}    
                </div>                
            </div>

        </div>
    );
};

export default Login;