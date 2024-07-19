"use client"

import { useEffect, useRef, useState } from 'react';
import { InnerworksAuth } from "@innerworks-me/iw-auth-sdk";

export default function FrontendFlowDemoPage() {
    /*
    The SDK is set using a useState hook, and a useRef hook is used to dynamically render
    the sign in button on the page.
    */
    const [innerworksAuth, setInnerworksAuth] = useState<InnerworksAuth | null>(null);
    const buttonContainerRef = useRef<HTMLDivElement>(null);

    /*
    To set up the SDK, update NEXT_PUBLIC_AUTH_PROJECT_ID with an auth flow project id. Then
    import the SDK within a useEffect hook.

    The InnerworksAuth class takes a redirectUri parameter as well as a project id. This redirect uri
    dictates where the user will be returned to after the authentication flow is finished (or where they
    will be directed to in case of an error). Here we are redirecting to 
    http://localhost:3000/demo/auth-flow/callback, you can see the source code for this page in
    /app/demo/auth-flow/callback/page.tsx
    */
    useEffect(() => {
        setInnerworksAuth(new InnerworksAuth(process.env.NEXT_PUBLIC_AUTH_PROJECT_ID!, `${process.env.NEXT_PUBLIC_BASE_URL!}/demo/auth-flow/callback`));
    }, [setInnerworksAuth]);

    /*
    Here we append the innerworks sign in button to the button container ref
    */
    useEffect(() => {
        if(innerworksAuth && buttonContainerRef.current) {
            // Generate the button and append it to the buttonContainerRef
            const button = innerworksAuth.getInnerworksSignInButton();
            buttonContainerRef.current.appendChild(button);
        }
    }, [innerworksAuth]);
    
    /*
    This is the main page body, the most notable thing here is the 'buttonContainerRef' attached to
    the div element where the button is to be placed.
    */
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-black">
            <h1 className="text-2xl font-bold mb-4">Auth Flow Demo Page</h1>
            <div className="text-center">
            <p className="mb-8 mx-64">
                This demonstrates the authentication flow, where the user is redirected to innerworks frontend + authenticated
                through google. Add an auth flow project id to the environment variables and click the button to login.
            </p>
            <div className="w-full max-w-xs mx-auto">
                <div className="w-full px-8 flex justify-content-center" ref={buttonContainerRef}/></div>
            </div>
        </div>
    );
}