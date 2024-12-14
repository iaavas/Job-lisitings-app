# Job Listings Application

This is a job listings application built using **Next.js**, **TypeScript**, **MongoDB**, and **Zustand**. The application allows users to browse job listings, view detailed job information, and mock apply for jobs. It also includes features like custom API routes, database integration, state management, pagination, form handling, and static site generation (SSG).

## Objective

The goal of this application is to provide a platform where users can:

- Browse and search for job listings.
- View detailed information about each job.
- Mock apply for jobs via a form.
- Mark jobs as favourites and view them in a separate section.

## Tech Stack

- **Frontend**: Next.js with TypeScript, Zustand for state management
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Styling**: Tailwind CSS

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd job-listings-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables in a `.env.local` file:

   ```env
   MONGODB_URI=<your-mongodb-connection-string>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:

   ```bash
   http://localhost:3000
   ```
