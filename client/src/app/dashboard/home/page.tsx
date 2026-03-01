"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import apiURL from '@/src/apiExport/apiURL';

const HomePage = () => {
    const router = useRouter();
    const handleLogout = async () => {
    try {
      

      const response = await fetch(`${apiURL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // MANDATORY to clear cookies
      });

      if (response.ok) {
        
        router.push('/auth/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
      <button 
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  )
}

export default HomePage