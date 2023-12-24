# Help Desk - A Full Stack Application with Next.js, Express.js, and PostgreSQL

This repository contains a full-stack application developed using Next.js for the frontend, Express.js for the backend, and PostgreSQL as the database. The application allows users to perform various actions related to managing tickets.

## Prerequisites

Before running this application locally or deploying it, ensure you have the following:

- Node.js and npm installed on your machine.
- Access to a PostgreSQL database, either locally or hosted on a service like Heroku.
- Heroku CLI installed if you plan to deploy the backend or the database.

## Installation

### Frontend (Next.js)

1. Navigate to the `frontend` directory: `cd frontend`.
2. Run `npm install` to install dependencies.
3. Set the environment variables required for the frontend, such as the backend API URL (`NEXT_PUBLIC_BACKEND_URL`).

### Backend (Express.js)

1. Navigate to the `backend` directory: `cd backend`.
2. Run `npm install` to install dependencies.
3. Set up the required environment variables, including the database connection details and other configuration variables.
4. Ensure the PostgreSQL database is set up and accessible.

## Running Locally

### Frontend

Run the frontend server locally by executing:

```
cd frontend
npm run dev
```
The frontend will be accessible at http://localhost:3000.

### Backend
Start the backend server locally by running:

```
cd backend
npm start
```
The backend server will run at http://localhost:3001.

## Deployment
### Frontend (Next.js)
Deploy the frontend to a hosting platform like Vercel or Netlify. Ensure to configure the environment variables for the deployed environment.

### Backend (Express.js)
To deploy the backend on Heroku:

1. Commit your changes: git add . && git commit -m "Deploying backend"
2. Create a Heroku app: heroku create <app-name>
3. Push your code to Heroku: git push heroku main
4. Set the required config vars on Heroku using heroku config:set <KEY>=<VALUE>

## Database
The application uses a PostgreSQL database hosted on Heroku. Access the Heroku Dashboard to manage and interact with the database.

### Contributing
Contributions are welcome! Feel free to open issues or pull requests for any improvements or bug fixes.

### License
This project is licensed under the MIT License.

