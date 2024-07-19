# Innerworks Fraud Detection Suite
This repository contains a demo integration of the Innerworks Fraud Detection Suite SDK in NextJS. There are two integrations in this demo, a frontend only flow which collects user metrics from a brief interaction with a login screen and sends it to us to be processed directly from the frontend. The second is a similar integration, but to be used alongside a third party social sign on, when the user id can only be collected after a redirect.

## Frontend Flow Setup

To run the frontend flow demo, follow these steps
1. Get a frontend flow project id from us and add it to the `.env` file as the variable `NEXT_PUBLIC_PROJECT_ID`
2. Run `npm install` in the project root directory
3. Run `npm run dev` to host the site on `http://localhost:3000`

To see the source code, and integration docs for the SDK, view the `/app/demo/frontend-flow/page.tsx` file.

## Social Sign-On Wrapper Flow Setup

To run the social sign on wrapper flow demo, follow these steps
1. Get a project id from us and add it to the `.env` file as the variable `NEXT_PUBLIC_PROJECT_ID`
2. Run `npm install` in the project root directory
3. Run `npm run dev` to host the site on `http://localhost:3000`

To see the source code, and integration docs for the SDK, view the `/app/demo/sso-wrapper-flow/page.tsx` and `/app/demo/sso-wrapper-flow/callback/page.tsx` file.

This repo is in constant development, please feel free to point out any issues or make any suggestions by emailing tom@innerworks.me
