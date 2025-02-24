"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/app/logout/actions";

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border rounded-full border-gray-500 w-8 h-8 flex items-center justify-center text-white"
      >
        0
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-black border border-gray-600 rounded-lg shadow-lg">
            <form action={logout}>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-800 rounded-lg">
                    <LogOut size={16} /> Sign out
                </button>
            </form>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
