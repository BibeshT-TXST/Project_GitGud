import { AuthContainer } from './components/AuthContainer';
import { BrandHeader } from './components/BrandHeader';
import { Input } from './components/Input';
import { PrimaryButton } from './components/PrimaryButton';

export default function LoginPage() {
  return (
    <AuthContainer>
      <BrandHeader title="Welcome Back" subtitle="Please enter your details" />
      
      <form className="mt-8 space-y-6">
        <Input label="Email Address" type="email" placeholder="name@company.com" />
        <Input label="Password" type="password" />
        
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
        </div>

        <PrimaryButton label="Sign In" isLoading={false} />
      </form>
    </AuthContainer>
  );
}