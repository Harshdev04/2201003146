# Frontend Test Submission - URL Shortener

## Overview

This project is a URL Shortener web application built using React, Vite, and Material UI. It allows users to input multiple long URLs, specify validity times, and optionally set custom shortcodes to generate shortened URLs.

## Features

- Supports shortening up to 5 URLs in one submission.
- Client-side validation to ensure URLs start with `http`.
- Displays generated short URLs with expiry information.
- Uses Axios for API calls to backend.
- Logs important events and errors.
- Responsive UI using Material UI components.

## Folder Structure

/Logging Middleware
└── logger.js
/Frontend Test Submission
└── afford-url-shortener
├── src
│ ├── components
│ ├── logging
│ ├── pages
│ │ └── ShortenPage.jsx
│ ├── routes
│ ├── App.jsx
│ └── main.jsx
├── public
├── package.json
└── vite.config.js

## Technologies Used

- React (with functional components and hooks)
- Vite (build tool)
- Material UI (v5+ for UI components)
- Axios (for HTTP requests)
- JavaScript (ES6+)
- Logging Middleware (custom logger.js)

## How to Run Locally

1. Clone the repository:
git clone https://github.com/Harshdev04/2201003146.git

2. Navigate to the frontend folder:
cd 2201003146/Frontend Test Submission

3. Install dependencies:

npm install
4. Run the development server:
npm run dev

markdown
Copy
Edit
5. Open your browser and visit:
http://localhost:5173


## Environment Setup

- The API base URL is proxied via `vite.config.js` to avoid CORS issues.
- The Authorization token is included in the request headers in `ShortenPage.jsx`.

## Screenshots

![image](https://github.com/user-attachments/assets/04e597dc-5194-442e-873f-c07a4756104e)


## Notes

- Backend API endpoint was assumed to be `/api/url`. Proxy is configured accordingly.
- The access token used is hardcoded in the frontend code for testing purposes.
- Proper error handling and logging have been implemented.

## Author

Roll Number: 2201003146
