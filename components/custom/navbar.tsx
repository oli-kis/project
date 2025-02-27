"use client";

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/img/taxioLogo.png';
import AuthButtons from "@/components/custom/AuthButtons";
import DropdownButton from './dropdownButton';
import DashboardButton from './dashboardButton';
import { User } from '@supabase/supabase-js';

type NavbarProps = {
  importUser: User | null;
};
export default function Navbar({ importUser }: NavbarProps) {
  return (
    <nav className="bg-darkBackground shadow-md shadow-green-400/10 px-4 py-1 flex items-center justify-between w-[90%] max-w-6xl mx-auto rounded-2xl shadow-lg fixed top-12 left-1/2 transform -translate-x-1/2 z-50">
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
        <Link href="/calculator" className="inline-flex h-8 w-max items-center justify-center rounded-lg 
              px-3 text-sm font-medium transition-colors 
             hover:bg-secondary-300/10 hover:text-accent-foreground 
             disabled:pointer-events-none disabled:opacity-50">Rechner</Link>
        <Link href="#" className="inline-flex h-8 w-max items-center justify-center rounded-lg 
              px-3 text-sm font-medium transition-colors 
             hover:bg-secondary-300/10 hover:text-accent-foreground 
             disabled:pointer-events-none disabled:opacity-50">Preise</Link>
        <Link href="#" className="inline-flex h-8 w-max items-center justify-center rounded-lg 
              px-3 text-sm font-medium transition-colors 
             hover:bg-secondary-300/10 hover:text-accent-foreground 
             disabled:pointer-events-none disabled:opacity-50">About</Link>
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-4">
        {importUser ? (<><DashboardButton /><DropdownButton /></>) : (<AuthButtons />)}
      </div>
    </nav>
  );
}
