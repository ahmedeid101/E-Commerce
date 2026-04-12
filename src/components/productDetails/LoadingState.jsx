import React from 'react';

const LoadingState = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="bg-gray-200 rounded-lg h-96" />
        </div>
        <div className="md:w-1/2 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-10 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  </div>
);

export default LoadingState;
