# CourseSellingApp - Backend

CourseSellingApp is a backend API built with **Node.js, Express, and MongoDB**, designed to manage courses, user authentication, and purchases. It provides a structured and scalable solution for administrators to create and manage courses while allowing users to browse, purchase, and track their enrolled courses.

## Features

- **Course Management API** – Endpoints for administrators to create, update, and manage courses, while users can browse, purchase, and track their enrolled courses.
- **Secure Authentication & Validation** – Implements **JWT-based authentication**, **Zod validation** for user inputs, and structured access control through middleware.
- **Scalable Backend Architecture** – Built with **Node.js, Express, and MongoDB**, ensuring efficient data handling, authentication, and role-based access control.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (with Mongoose ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod
- **Middleware:** Custom authentication and authorization logic

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/PulkitSharma-Git/CourseSellingApp
   cd CourseSellingApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables: Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_USER_PASSWORD=your_jwt_secret_for_users
   JWT_ADMIN_PASSWORD=your_jwt_secret_for_admins
   ```
4. Start the server:
   ```sh
   npm start
   ```



