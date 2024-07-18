"use client"

import Layout from '../layout';
import { FormEvent, useEffect, useState } from 'react';
import { InnerworksMetrics } from "@innerworks-me/iw-auth-sdk-dev";

export default function SSOWrapperFlowDemoPage() {
    const [innerworksMetrics, setInnerworksMetrics] = useState<InnerworksMetrics>();
    const [authError, setAuthError] = useState<string | null>(null);

    /*
    To set up the SDK, update NEXT_PUBLIC_FRONTEND_FLOW_PROJECT_ID with a frontend flow project id. Then
    import the SDK within a useEffect hook
    */
    useEffect(() => {
        setInnerworksMetrics(new InnerworksMetrics(process.env.NEXT_PUBLIC_FRONTEND_FLOW_PROJECT_ID!, '#signin-button'));
    }, [setInnerworksMetrics]);

    /*
    This function handles form submission, i.e. the sign in button being pressed. The main
    functionality here is the `await innerworksMetrics.send(id!)` line which will send the 
    collected metrics to innerworks.
    */
    const handleSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
        formEvent.preventDefault();

        // Store collected metrics in local storage before redirecting with social sign on
        if(innerworksMetrics) {
            try {
                const didStoreMetrics = await innerworksMetrics.storeDataInLocalStorage();
                if (!didStoreMetrics) {
                    setAuthError("Failed to store metrics");
                }
            } catch(err) {
                setAuthError("Failed to store metrics");
            }
        } else {
            setAuthError("Failed to import innerworks SDK");
        }

        /*
        ---- REDIRECT TO YOUR SOCIAL SIGN ON PROVIDER HERE ----
        */
        mockSocialRedirect();
    };

    /*
    This function is a mocked version of a SSO redirect, this simply redirects directly to
    the callback page passing a mocked social id.
    */
    function mockSocialRedirect() : void {
        window.location.href = '/demo/sso-wrapper-flow/callback?id=some-social-id';
    }
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-black">
            <h1 className="text-2xl font-bold mb-4">SSO Wrapper Demo Page</h1>
            <div className="text-center">
            <p className="mb-8 mx-64">
                This demonstrates the social sign on wrapper flow, where metrics are stored in local storage when the user 
                opts to sign in using a third party social sign-on provider. After redirecting to the social sign-on page and
                returning to this page, the innerworks SDK can take the metrics from local storage and pass it to innerworks 
                along with the social sign-on id. Note that we do not actually integrate a social sign-on into this demo, it is 
                only mocked.
            </p>
            <div className="w-full max-w-xs mx-auto">
                <form onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        id="signin-button"
                        className="w-full bg-black text-white py-2 px-2 border border-black hover:bg-gray-700"
                    >
                        Login with Social Sign On
                    </button>
                </form>
                <p className={`py-2 mb-8 text-red-500 ${authError ? "opacity-100" : "opacity-0"}`}>
                    {authError ?? "Invalid login attempt."}
                </p>
            </div>
            </div>
        </div>
    );
}