import React from "react";
import Link from 'next/link';

export default function AuthButtons () {
  return (
    <div className="flex">
        <Link href="/login">
      <button className="px-4 py-2 bg-transparent text-white rounded-l-lg border border-gray-600 hover:bg-gray-700">
        Sign In
      </button>
        </Link>
        <Link href="/register">
      <button className="px-4 py-2 bg-transparent text-white rounded-r-lg border border-gray-600 hover:bg-gray-700">
        Sign up
      </button>
        </Link>
    </div>
  );
};
