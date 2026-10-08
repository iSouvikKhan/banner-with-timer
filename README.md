# Banner with Timer

A small full-stack app that shows a promotional banner with a live countdown timer. The banner text, link and target date are set through a form, saved to a MySQL database through an Express API, and loaded again when the page opens.

Link: [https://banner-with-timer.onrender.com](https://banner-with-timer.onrender.com)

## Features

- Banner with custom text and a "click here" link that opens in a new tab
- Countdown timer showing days, hours, minutes and seconds until the target date
- Form to set the banner text, link and target date/time, with required-field validation
- "Reset Timer" button that sets the countdown to zero
- On page load, the most recent saved banner is fetched and shown if its target date is still in the future

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** MySQL

## Project Structure

```
banner-with-timer/
├── backend/
│   ├── index.js              # Express server and API routes
│   ├── prisma/
│   │   ├── schema.prisma     # Entry model (description, url, providedDatetime)
│   │   └── migrations/       # Initial migration
│   └── .env.example          # Example DATABASE_URL
└── frontend/
    ├── index.html
    └── src/
        ├── App.tsx           # Fetches/saves entries, holds banner state
        ├── config.ts         # API_BASE_URL (http://localhost:3000)
        └── components/
            ├── Banner.tsx     # Banner and countdown timer
            └── BannerForm.tsx # Form for text, link and target date
```

## Prerequisites

- Node.js and npm
- A running MySQL server

## Setup and Running

### Backend

1. Navigate to the backend folder and install dependencies:

   ```bash
   cd backend
   npm i
   ```

2. Create a `.env` file based on `.env.example` and set `DATABASE_URL` to your MySQL connection string:

   ```bash
   # Linux/macOS
   cp .env.example .env
   ```

   ```bat
   :: Windows
   copy .env.example .env
   ```

3. Apply the database migration and generate the Prisma client:

   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

4. Start the server:

   ```bash
   node index.js
   ```

   The server listens on the port in the `PORT` environment variable, or `3000` by default.

### Frontend

1. Navigate to the frontend folder and install dependencies:

   ```bash
   cd frontend
   npm i
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

The frontend calls the API at the URL set in `frontend/src/config.ts` (`http://localhost:3000` by default). Change it there if the backend runs elsewhere.

Other frontend scripts: `npm run build`, `npm run preview`, `npm run lint`.

## API

| Method | Route      | Description                                                        |
|--------|------------|--------------------------------------------------------------------|
| POST   | `/entry`   | Creates an entry. JSON body: `description`, `url`, `providedDatetime` |
| GET    | `/entries` | Returns the most recent entry (404 if none exist)                  |
