"use client"

import { useSearchParams } from 'next/navigation';
import Layout from '../../layout';
import { useEffect, useState } from 'react';
import { InnerworksMetrics } from '@innerworks-me/iw-auth-sdk-dev';

export default function Callback() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const id = params.id;

  const [innerworksMetrics, setInnerworksMetrics] = useState<InnerworksMetrics>();
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);

  /*
  To set up the SDK, update NEXT_PUBLIC_FRONTEND_FLOW_PROJECT_ID with a frontend flow project id. Then
  import the SDK within a useEffect hook
  */
  useEffect(() => {
    setInnerworksMetrics(new InnerworksMetrics(process.env.NEXT_PUBLIC_FRONTEND_FLOW_PROJECT_ID!));
  }, [setInnerworksMetrics]);

  // Send innerworks metrics once SDK is initialized
  useEffect(() => {
    sendInnerworksMetrics();
  }, [innerworksMetrics]);

  /*
  This function sends metrics to innerworks from local storage, passing the query parameter id 
  (you can also handle errors from the social sign on here).
  */
  async function sendInnerworksMetrics() {
    if(innerworksMetrics) {
        try {
            await innerworksMetrics.sendFromStoredData(id);
            setAuthSuccess(true);
        } catch(err) {
            setAuthError("Failed to send metrics to innerworks");
        }
    } else {
        setAuthError("Failed to import innerworks SDK");
    }
  }

  return (
    <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
        {authSuccess ? (
            <div className="text-center text-lg mb-4 text-green-500">Authentication Successful! User Metrics were sent to innerworks</div>
        ) : authError == null ? 
        (
            <div className="text-center text-lg mb-4 text-black">
                Loading...
            </div>
        ) : (
            <div className="text-center text-lg mb-4 text-red-500">
                Error: {authError ?? "An error has occurred on our end..."}
            </div>
        )}
        </div>
    </Layout>
  );
}