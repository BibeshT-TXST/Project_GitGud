import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Topography from '@mui/material/Typography';
import TokenIcon from '@mui/icons-material/Token';

const Login = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
}