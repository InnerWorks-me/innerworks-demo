"use client"

import { useSearchParams } from 'next/navigation';
import Layout from '../../layout';

export default function Callback() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const error = params.error;
  const id = params.id;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
        {!id && (
          <div className="text-center text-lg mb-4 text-red-500">
            Error: {error ?? "An error has occurred on our end..."}
          </div>
        )}
        {id && !error && (
          <div className="text-center text-lg mb-4 text-green-500">
            Authentication Successful!
          </div>
        )}
      </div>
    </Layout>
  );
}