# FrontRow --- Frontend

FrontRow is an event-booking application that lets users register and
log in, create and browse venues and events, and explore matching events
through an AI-powered chat interface.

## Features

-   User registration and login
-   Cookie-based authentication and sign-out
-   Create and list venues
-   Create and list events
-   Seat-map UI backed by venue seat inventory and event-specific
    seat-claim status
-   AI-assisted event discovery through chat
-   Chat messages are kept in frontend memory for the current UI
    session; they are not persisted by the backend

## Prerequisites

-   Node.js and npm
-   The FrontRow backend running and reachable
-   Backend/API configuration values required by this frontend

## Setup

From the frontend project directory:

``` bash
cp .env.example .env
```

Edit `.env` and set the appropriate values for your environment,
including the backend API URL if the project uses one.

Install dependencies:

``` bash
npm install
```

## Run locally

``` bash
npm run dev
```

Use the local URL printed by the development server.

## Typical user flow

1.  Register an account.
2.  Log in to access the application.
3.  Create or browse venues and events.
4.  View seat availability for an event where the seat-map feature is
    available.
5.  Use the chat interface to describe event preferences, such as
    maximum price or capacity, and review matching events.
6.  Sign out when finished.

## Authentication notes

The frontend uses cookies for authentication rather than storing JWTs in
`localStorage`. Configure the frontend and backend consistently so
credentialed API requests and cookie settings work across the chosen
origins. Cookie-based authentication should use appropriate `HttpOnly`,
`Secure`, and `SameSite` settings and CSRF protections based on the
deployment setup.

## AI chat notes

The frontend displays the user's messages and the event results returned
by the backend. Messages are held in in-memory UI state, so they are not
retained after the page is refreshed or the application state is reset.
The backend does not persist the conversation.

## Troubleshooting

-   **API requests fail:** Confirm the backend is running and the
    configured API URL is correct.
-   **Login does not persist:** Check cookie settings, allowed origins,
    credentialed requests, and whether frontend/backend are using HTTP
    or HTTPS consistently.
-   **Dependencies fail to install:** Confirm the installed Node.js/npm
    versions are compatible with the project and retry `npm install`.
-   **Environment configuration is missing:** Confirm `.env` exists and
    contains the values required by the project.

## Scope notes

Email verification is not currently implemented. Seat-section-based
filtering is not currently implemented.