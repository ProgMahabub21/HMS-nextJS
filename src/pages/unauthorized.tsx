import React from "react";
import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">Unauthorized | 401</h1>
        <p className="mb-4 text-xl text-white">You are not authorized to access this page.</p>
        <p className="mb-4 text-xl text-white">
          Please <Link href="/login"className="text-blue-500">log in</Link> to continue.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
