'use client'

import { useTrackUserSource } from '../hooks/useTrackUserSource';
import { useEffect, useState } from 'react';

export function UserTracker() {
  const visitData = useTrackUserSource();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="text-center p-4">Initializing user tracking...</div>;
  }

  if (!visitData) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">User Visit Data</h2>
        <p className="text-center">Loading visit data...</p>
        <p className="text-sm text-gray-500 mt-2">This may take a few seconds as we gather information from various sources.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">User Visit Data</h2>
      <div className="space-y-4">
        {Object.entries(visitData).map(([key, value]) => (
          <div key={key} className="flex flex-col border-b pb-2">
            <span className="font-semibold">{key}:</span>
            <span className="ml-2">{value as string || 'Not available'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

