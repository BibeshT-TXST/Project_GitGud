import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContainer } from './AuthContainer';
import { BrandHeader } from './Header';
import { Input } from './Input';
import { PrimaryButton } from './Button';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); //Prevents page refresh
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });    // Send  Creditials to the backend
      const { token } = response.data;                                        // Extract JWT token from response
      login(token);                                                           // Store the token in context
      console.log('Login successful');
    } catch (error) {
      console.error('Invalid credentials, please try again:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <BrandHeader title="Welcome Back" subtitle="Please enter your details" />
      
      <form className="mt-8 space-y-6">
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
          label="Password" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
        </div>

        <PrimaryButton 
          label="Sign In" 
          isLoading={false}
          type ="submit" 
        />
      </form>
    </AuthContainer>
  );
}