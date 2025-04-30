import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-md">
        <Trophy className="h-16 w-16 text-primary-500 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-primary-700 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Page Not Found</h2>
        <p className="text-neutral-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg transition-colors"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;