# Innerworks Fraud Detection Suite
This repository contains a demo integration of the Innerworks Fraud Detection Suite SDK in NextJS. It collects user metrics from a brief interaction with a login screen and sends it to us to be processed, completely under the hood and frictionlessly.

To run the demo, follow these steps
1. Get a project id from us and add it to the `.env` file as the variable `NEXT_PUBLIC_FRONTEND_FLOW_PROJECT_ID`.
2. Run `npm install` in the project root directory
3. Run `npm run dev` to host the site on `http://localhost:3000`

To see the source code, and integration docs for the SDK, view the `/app/demo/frontend-flow/page.tsx` file.

Integrations for a backend flow, and authentication flow, coming soon.

This repo is in constant development, please feel free to point out any issues or make any suggestions by emailing tom@innerworks.me
