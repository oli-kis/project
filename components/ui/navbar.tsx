'use client';

import { useState } from 'react';
import { Download, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/img/taxioLogo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black px-4 py-1 flex items-center justify-between w-[90%] max-w-6xl mx-auto mt-4 rounded-2xl shadow-lg">
    {/* Logo */}
    <div className="flex items-center gap-2">
    <Image 
        src={logo}
        alt="Taximo Logo"
        width={50}
        height={50}
      />
      <span className="text-white-300 text-xl font-bold">Taximo</span>
    </div>
    
    {/* Navigation Links */}
    <div className="hidden md:flex space-x-6">
        <Link href="#" className="inline-flex h-8 w-max items-center justify-center rounded-lg 
              px-3 text-sm font-medium transition-colors 
             hover:bg-secondary-300/10 hover:text-accent-foreground 
             disabled:pointer-events-none disabled:opacity-50">Calculate</Link>
        <Link href="#" className="inline-flex h-8 w-max items-center justify-center rounded-lg 
              px-3 text-sm font-medium transition-colors 
             hover:bg-secondary-300/10 hover:text-accent-foreground 
             disabled:pointer-events-none disabled:opacity-50">Pricing</Link>
        <Link href="#" className="inline-flex h-8 w-max items-center justify-center rounded-lg 
              px-3 text-sm font-medium transition-colors 
             hover:bg-secondary-300/10 hover:text-accent-foreground 
             disabled:pointer-events-none disabled:opacity-50">About</Link>
        <Link href="#" className="inline-flex h-8 w-max items-center justify-center rounded-lg 
              px-3 text-sm font-medium transition-colors 
             hover:bg-secondary-300/10 hover:text-accent-foreground 
             disabled:pointer-events-none disabled:opacity-50">Imprint</Link>
      </div>
      
      {/* Right Buttons */}
      <div className="flex items-center gap-4">
        <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
          <Download size={16} />
        </button>
        <button className="px-4 py-2 bg-white text-black rounded-lg">Dashboard</button>
        <button className="p-2 border rounded-full border-gray-500 w-8 h-8 flex items-center justify-center">0</button>
        <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
          <Moon size={16} />
        </button>
      </div>
    </nav>
  );
}
