// "use client";
// import React, { useState } from 'react';

// interface FormData {
//   name: string;
//   email: string;
//   country: string;
//   phone: string;
//   password: string;
// }

// const RegisterForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     country: '',
//     phone: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Add your API call here
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 flex items-center justify-center p-4">
//       <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/50 relative">
//         {/* Header with close button */}
//         <div className="text-center mb-8 relative">
//           <h2 className="text-2xl font-bold text-gray-800 mb-1">Registration Form</h2>
//           <button 
//             className="absolute right-0 top-0 text-sm text-gray-500 hover:text-gray-700 p-1"
//             onClick={() => console.log('Close form')}
//           >
//             ×
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4 mb-6">
//           <div>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email address"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={formData.country}
//               onChange={handleChange}
//               className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               required
//             />
//           </div>

//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-4 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               required
//             />
//             <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 text-sm pointer-events-none">
//               {showPassword ? '••••••' : '••••••'}
//             </div>
//             <button
//               type="button"
//               className="absolute right-16 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? 'Hide' : 'Show'}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 mb-6 transform hover:-translate-y-0.5"
//           >
//             Create Account
//           </button>

//           <p className="text-center text-sm text-gray-600">
//             Already have account?{' '}
//             <a href="#" className="text-blue-500 hover:underline font-medium">
//               Sign in
//             </a>
//           </p>
//         </form>

//         {/* Footer */}
//         <div className="absolute bottom-4 right-4 text-xs text-gray-400">
//           designed by freepik
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

 "use client";
import React, { useState } from 'react';
import { Eye, EyeIcon, EyeOff } from 'lucide-react';
import apiURL from "../../../src/apiExport/apiURL"

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    agreeToTerms: false
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  try {
    const response = await fetch(`${apiURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration Successful!");
      // Option: use next/navigation to redirect
      // router.push('/login'); 
    } else {
      alert(data.message || "Error occurred");
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
};
    // Add your API call logic here
  

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-400 to-emerald-400 p-4">
      {/* Main Card */}
      <div className="relative w-full max-w-md bg-white rounded-sm shadow-2xl p-8 md:p-12">
        
        

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          
          <h2 className="text-2xl font-bold text-cyan-500 tracking-tight">Registration Form</h2>

        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Name Field */}
          <div className="relative border-b border-cyan-300">
            <span className="absolute -left-3 top-0 text-xs text-gray-400">*</span>
            <input 
              type="text" 
              placeholder="Name" 
               name="name"
               value={formData.name}
              onChange={handleChange}
              className="w-full py-2 bg-transparent outline-none placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Email Field */}
          <div className="relative border-b border-cyan-300">
            <span className="absolute -left-3 top-0 text-xs text-gray-400">*</span>
            <input 
              type="email" 
               name="email"
              placeholder="Email address" 
              value={formData.email}
              onChange={handleChange}
              className="w-full py-2 bg-transparent outline-none placeholder-gray-400 text-gray-700"
            />
          </div>

          

          {/* Phone Field */}
          <div className="relative border-b border-cyan-300">
            <span className="absolute -left-3 top-0 text-xs text-gray-400">*</span>
            <input 
              type="tel" 
              placeholder="Phone" 
               name="phone"
               value={formData.phone}
              onChange={handleChange}
              className="w-full py-2 bg-transparent outline-none placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Password Field */}
          <div className="relative border-b border-cyan-300 flex items-center">
            <span className="absolute -left-3 top-0 text-xs text-gray-400">*</span>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
               name="password"
                value={formData.password}
              onChange={handleChange}
              className="w-full py-2 bg-transparent outline-none placeholder-gray-400 text-gray-700"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" text-gray-500 hover:text-gray-700 transition-colors"
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} fill="" />}
            </button>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input 
              type="checkbox" 
              className="mt-1 border-blue-400 rounded-sm focus:ring-0" 
            />
            <p className="text-[10px] text-gray-500 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.
            </p>
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-emerald-400 text-white font-semibold text-sm tracking-widest uppercase shadow-lg hover:opacity-90 transition-opacity">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-xs text-gray-500">
          Already have an account? <a href="/auth/login" className="text-blue-400 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
