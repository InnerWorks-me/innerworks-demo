# Innerworks Fraud Detection Suite
This repository contains a demo integration of the Innerworks Fraud Detection Suite SDK in NextJS. There are two integrations in this demo, a frontend only flow which collects user metrics from a brief interaction with a login screen and sends it to us to be processed directly from the frontend. The second is an authentication flow, which sits as a wrapper over google social sign-on. As well as authenticating a user through google, user metrics are collected by the SDK on the login screen, completely under the hood and frictionlessly.

## Frontend Flow Setup

To run the frontend flow demo, follow these steps
1. Get a frontend flow project id from us and add it to the `.env` file as the variable `NEXT_PUBLIC_FRONTEND_FLOW_PROJECT_ID`
2. Run `npm install` in the project root directory
3. Run `npm run dev` to host the site on `http://localhost:3000`

To see the source code, and integration docs for the SDK, view the `/app/demo/frontend-flow/page.tsx` file.

## Authentication Flow Setup

To run the authentication flow demo, follow these steps
1. Get an authentication flow project id from us and add it to the `.env` file as the variable `NEXT_PUBLIC_AUTH_PROJECT_ID`
2. Run `npm install` in the project root directory
3. Run `npm run dev` to host the site on `http://localhost:3000`

To see the source code, and integration docs for the SDK, view the `/app/demo/auth-flow/page.tsx` and `/app/demo/auth-flow/callback/page.tsx` file.

Integrations for a backend flow coming soon.

This repo is in constant development, please feel free to point out any issues or make any suggestions by emailing tom@innerworks.me
