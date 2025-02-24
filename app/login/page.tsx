'use client';

import { useState } from 'react';
import { login } from "./actions"
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
          Login
        </h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your email"
              name="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="mt-1 w-full rounded-md border px-4 py-2 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your password"
                name="password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account yet? {' '}
              <a href="/register" className="text-blue-600 hover:underline">
                Create one
              </a>
            </p>
          </div>

          <button
           formAction={login}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}

