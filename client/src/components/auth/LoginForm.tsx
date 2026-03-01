"use client";
import React, { useEffect,  useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useRouter ,useSearchParams} from 'next/navigation';
import apiURL from '@/src/apiExport/apiURL';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

   

    try {
      const response = await fetch(`${apiURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
       credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Store the Access Token (usually in a Context or State)
        // localStorage.setItem('token', data.accessToken); // Simple way
        
        // 2. Navigate to the dashboard
        router.push('/dashboard/home');
      } else {
        alert(data.message || "Error in login");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Server is not responding");
    } finally {
      setLoading(false);
    }
  };

  // 2. Google OAuth Login
  const handleGoogleLogin = () => {
    // We don't use fetch here. We redirect the browser to the backend.
    // The backend then redirects the user to Google.
    console.log("google login clicked, redirecting to:", `${apiURL}/auth/google`);
    window.location.href = `${apiURL}/auth/google`;
  };

  useEffect(() => {
    const error = searchParams.get('error');

    if (error === 'account_not_found') {
      // 1. Show the alert
      alert("No account found with this Gmail. Please register first!");
      
      // 2. Redirect to the register page
      router.push('/auth/register');
    }
  }, [searchParams, router]);
  // --- NEW LOGIC END ---
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-400 to-emerald-400 p-4">
      <div className="relative w-full max-w-md bg-white rounded-sm shadow-2xl p-8 md:p-12 text-center">
        
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-blue-600 font-bold text-xl">·</span>
          <h2 className="text-2xl font-bold text-cyan-500 tracking-tight">Welcome Back</h2>
          <span className="text-blue-600 font-bold text-xl">·</span>
        </div>

        <form className="space-y-6 text-left" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative border-b border-cyan-300">
            <input 
              name="email"
              type="email" 
              placeholder="Email address" 
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 bg-transparent outline-none placeholder-gray-400 text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="relative border-b border-cyan-300 flex items-center">
            <input 
              name="password"
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full py-2 bg-transparent outline-none placeholder-gray-400 text-gray-700"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-blue-600 hover:text-blue-800 transition-colors ml-2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} fill="" />}
            </button>
          </div>

          {/* <div className="text-right">
            <a href="#" className="text-[11px] text-blue-400 hover:underline">Forgot password?</a>
          </div> */}

          {/* Login Button */}
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-emerald-400 text-white font-semibold text-sm tracking-widest uppercase shadow-lg hover:brightness-105 transition-all">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or login with</span></div>
        </div>

        {/* Google Login Button */}
        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-2 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors text-gray-600 text-sm font-medium"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>

        <p className="mt-8 text-xs text-gray-500">
          Don't have an account? <a href="/auth/register" className="text-blue-400 hover:underline font-medium">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;