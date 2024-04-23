"use client"

import Layout from '../layout';
import { FormEvent, useEffect, useState } from 'react';
import { InnerworksMetrics } from "@innerworks-me/iw-auth-sdk";

export default function FrontendFlowDemoPage() {
    const [userName, setUserName] = useState<string>();
    const [password, setPassword] = useState<string>();
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

    /*
    This function handles form submission, i.e. the sign in button being pressed. The main
    functionality here is the `await innerworksMetrics.send(id!)` line which will send the 
    collected metrics to innerworks.
    */
    const handleSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
        formEvent.preventDefault();
        
        // get details from form
        const form = formEvent.target as HTMLFormElement;
        const usernameInput = form.elements.namedItem('username') as HTMLInputElement;
        const passwordInput = form.elements.namedItem('password') as HTMLInputElement;

        /*
        ---- PERFORM YOUR AUTHENTICATION HERE ----
        */
        const id = mockAuthenticator(usernameInput.value, passwordInput.value);
        const isAuthSuccessful : boolean = id != null;

        /*
        On authentication success, send metrics to innerworks. Make sure to first assert
        the SDKs presence. The innerworksMetrics.send() function will return a boolean
        determining its success rather than throwing an error so as not to disrupt 
        the normal workings of your website if there is a failure.
        */
        if(isAuthSuccessful) {
            setAuthError(null);
            if(innerworksMetrics) {
                const metricsSendSuccess = await innerworksMetrics.send(id!);
                if(metricsSendSuccess) {
                    setAuthSuccess(true);
                } else {
                    /* 
                    Here we display an error, but you don't have to! You may want to just 
                    log that it has failed and let things proceed as normal
                    */
                    setAuthError("Error when sending innerworks metrics");
                }
            } else {
                setAuthError("Innerworks SDK is not defined");
            }
        } else {
            setAuthError("Username or Password Incorrect");
        }
    };

    /*
    This function is a mocked version of your authentication process
    */
    function mockAuthenticator(username: string, password: string) : string | null {
        if(username === "test-username" && password === "password") {
            return "mock-user-id";
        }
        return null;
    }
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-black">
            <h1 className="text-2xl font-bold mb-4">Frontend Flow Demo Page</h1>
            {authSuccess ? (
                <p className="mb-8 text-green-500 text-center">Authentication Successful! User Metrics were sent to innerworks</p>
            ) : (
                <div className="text-center">
                <p className="mb-8 mx-64">
                    This demonstrates the frontend flow, where a request sending the metrics is sent directly to innerworks 
                    from the frontend. Add a frontend flow project id to the environment variables and use the username "test-username" and 
                    password "password" to login.
                </p>
                <div className="w-full max-w-xs mx-auto">
                    <form onSubmit={handleSubmit}>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className="form-input w-full text-gray-800 border border-black py-2 px-2 mb-4"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-input w-full text-gray-800 border border-black py-2 px-2 mb-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 px-2 border border-black hover:bg-gray-700"
                        >
                            Submit
                        </button>
                    </form>
                    <p className={`py-2 mb-8 text-red-500 ${authError ? "opacity-100" : "opacity-0"}`}>
                        {authError ?? "Invalid login attempt."}
                    </p>
                </div>
                </div>
            )}
        </div>
    );
}