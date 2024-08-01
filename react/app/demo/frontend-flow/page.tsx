"use client";

import Layout from '../layout';
import { FormEvent, useEffect, useState } from 'react';
import { InnerworksMetrics } from "@innerworks-me/iw-auth-sdk";

type ButtonPosition = 'top-right' | 'bottom-left' | 'bottom-right';

export default function FrontendFlowDemoPage() {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [innerworksMetrics, setInnerworksMetrics] = useState<InnerworksMetrics | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const [authSuccess, setAuthSuccess] = useState<boolean>(false);
    const [buttonPosition, setButtonPosition] = useState<ButtonPosition>('bottom-right');

    useEffect(() => {
        setInnerworksMetrics(new InnerworksMetrics(process.env.NEXT_PUBLIC_PROJECT_ID!, '#signin-button'));
        setButtonPosition(getRandomCorner());
    }, []);

    const getRandomCorner = (): ButtonPosition => {
        const corners: ButtonPosition[] = ['top-right', 'bottom-left', 'bottom-right'];
        return corners[Math.floor(Math.random() * corners.length)];
    };

    const handleSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
        formEvent.preventDefault();
        
        const form = formEvent.target as HTMLFormElement;
        const usernameInput = form.elements.namedItem('username') as HTMLInputElement;
        const passwordInput = form.elements.namedItem('password') as HTMLInputElement;

        const id = mockAuthenticator(usernameInput.value, passwordInput.value);
        const isAuthSuccessful: boolean = id != null;

        if (isAuthSuccessful) {
            setAuthError(null);
            if (innerworksMetrics) {
                const metricsSendSuccess = await innerworksMetrics.send(id!);
                if (metricsSendSuccess) {
                    setAuthSuccess(true);
                } else {
                    setAuthError("Error when sending innerworks metrics");
                }
            } else {
                setAuthError("Innerworks SDK is not defined");
            }
        } else {
            setAuthError("Please use a username in the form human_name_device");
        }
    };

    function mockAuthenticator(username: string, password: string): string | null {
        const regex = /^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9]+$/;
        if (regex.test(username)) return username;
        return null;
    }

    const buttonStyles = {
        'top-left': 'absolute top-2 left-2',
        'top-right': 'absolute top-2 right-2',
        'bottom-left': 'absolute bottom-2 left-2',
        'bottom-right': 'absolute bottom-2 right-2',
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-black relative">
            <h1 className="text-2xl font-bold mb-4">Innerworks Sign In</h1>
            {authSuccess ? (
                <p className="mb-8 text-green-500 text-center">Authentication Successful! User Metrics were sent to innerworks</p>
            ) : (
                <div className="text-center">
                    <p className="mb-8 mx-64">
                        Please login below using a username and password. Please use the 
                        username as human_name_device for example human_james_macbook. 
                        Please also use the same password each time.
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
                            <p className={`py-2 mb-8 text-gray-800`}>
                                The submit button is located in one of the screen corners!
                            </p>
                            <p className={`py-2 mb-8 text-red-500 ${authError ? "opacity-100" : "opacity-0"}`}>
                                {authError ?? "Invalid login attempt."}
                            </p>
                            <button
                                type="submit"
                                id="signin-button"
                                className={`bg-black text-white py-2 px-4 border border-black hover:bg-gray-700 ${buttonStyles[buttonPosition]}`}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
