'use client';

import { useState } from 'react';
import { Download, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/img/taxioLogo.png';
import AuthButtons from "@/components/ui/AuthButtons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-darkBackground shadow-md shadow-green-400/10 px-4 py-1 flex items-center justify-between w-[90%] max-w-6xl mx-auto rounded-2xl shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
    {/* Logo */}
    <a href="/">
    <div className="flex items-center gap-2">
    <Image 
        src={logo}
        alt="Taximo Logo"
        width={50}
        height={50}
        />
      <span className="text-white-300 text-xl font-bold">Taximo</span>
    </div>
        </a>
    
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
        <Link href="/login" className="inline-flex h-8 w-max items-center justify-center rounded-lg 
              px-3 text-sm font-medium transition-colors 
             hover:bg-secondary-300/10 hover:text-accent-foreground 
             disabled:pointer-events-none disabled:opacity-50">About</Link>
      </div>
      
      {/* Right Buttons */}
      <div className="flex items-center gap-4">
        <AuthButtons/>
      </div>
    </nav>
  );
}
