# BookID Server API - BE-2-Medan-14

Welcome to the documentation for the BookID Server API - the backend for the [BookID](https://kampus-merdeka-software-engineering.github.io/FE-2-Medan-14) hotel booking website in Indonesia. This API provides a set of routes to handle user authentication, hotel bookings, photos, room reviews, rooms, and user management.

## Table of Contents

-   [BookID Server API - BE-2-Medan-14](#bookid-server-api---be-2-medan-14)
    -   [Table of Contents](#table-of-contents)
    -   [Installation](#installation)
    -   [Configuration](#configuration)
    -   [Database Setup](#database-setup)
    -   [Running the Server](#running-the-server)
    -   [Available Scripts](#available-scripts)
    -   [Dependencies](#dependencies)
    -   [Authentication](#authentication)
        -   [Me](#me)
        -   [Login](#login)
        -   [Register](#register)
        -   [Update Profile](#update-profile)
        -   [Logout](#logout)
    -   [Bookings](#bookings)
        -   [Get Bookings](#get-bookings)
        -   [Get Booking by ID](#get-booking-by-id)
        -   [Create Booking](#create-booking)
        -   [Update Booking](#update-booking)
        -   [Delete Booking](#delete-booking)
    -   [Photos](#photos)
        -   [Get Photos](#get-photos)
        -   [Get Photo by ID](#get-photo-by-id)
        -   [Create Photo](#create-photo)
        -   [Update Photo](#update-photo)
        -   [Delete Photo](#delete-photo)
    -   [Room Reviews](#room-reviews)
        -   [Get Room Reviews](#get-room-reviews)
        -   [Get Room Review by ID](#get-room-review-by-id)
    -   [Rooms](#rooms)
        -   [Get Rooms](#get-rooms)
        -   [Get Room by ID](#get-room-by-id)
        -   [Create Room](#create-room)
        -   [Update Room](#update-room)
        -   [Delete Room](#delete-room)
    -   [Users](#users)
        -   [Get Users](#get-users)
        -   [Get User by ID](#get-user-by-id)
        -   [Create User](#create-user)
        -   [Update User](#update-user)
        -   [Delete User](#delete-user)

## Installation

To get started, clone this repository and install the dependencies using npm:

```bash
git clone <repository-url>
cd bookid_server
npm install
```

## Configuration

Make sure to set up your environment variables by creating a `.env` file in the root directory. You can use the provided `.env.example` as a template.

```env
PORT = 5000
SESSION_SECRET = yourSecret
HOST = localhost/yourHost
CLIENT_URL = https://yourClientUrl
DATABASE_URL = yourDbUrl
ADMIN_NAME = yourAdminName
ADMIN_EMAIL = yourAdminGmail@mail.co
ADMIN_PASSWORD = yourAdminPassword
ADMIN_PHONE = yourAdminPhone
ADMIN_PHOTO = yourAdminPhoto
```

Make sure install dependencies by running this.

```bash
npm i
```

## Database Setup

BookID Server uses Sequelize with MySQL. Make sure you have a MySQL server running and update your `.env` file with the appropriate database configuration.

## Running the Server

Start the server using the following command:

```bash
npm start
```

The server will be running at `http://localhost:5000` by default. You can change the port in the `.env` file.

## Available Scripts

-   `npm start`: Starts the server.

## Dependencies

-   [Argon2](https://www.npmjs.com/package/argon2)
-   [Connect Session Sequelize](https://www.npmjs.com/package/connect-session-sequelize)
-   [CORS](https://www.npmjs.com/package/cors)
-   [Dotenv](https://www.npmjs.com/package/dotenv)
-   [Express](https://www.npmjs.com/package/express)
-   [Express Session](https://www.npmjs.com/package/express-session)
-   [MySQL2](https://www.npmjs.com/package/mysql2)
-   [Node Cron](https://www.npmjs.com/package/node-cron)
-   [Sequelize](https://www.npmjs.com/package/sequelize)

## Authentication

### Me

-   **Endpoint:** `/me`
-   **Method:** `GET`
-   **Description:** Get the details of the currently authenticated user.

### Login

-   **Endpoint:** `/login`
-   **Method:** `POST`
-   **Description:** Log in with a registered account.

### Register

-   **Endpoint:** `/register`
-   **Method:** `POST`
-   **Description:** Register a new user account.

### Update Profile

-   **Endpoint:** `/update-profile`
-   **Method:** `PATCH`
-   **Description:** Update the profile information of the currently authenticated user.

### Logout

-   **Endpoint:** `/logout`
-   **Method:** `DELETE`
-   **Description:** Log out the currently authenticated user.

## Bookings

### Get Bookings

-   **Endpoint:** `/bookings`
-   **Method:** `GET`
-   **Description:** Get all bookings for the currently authenticated user.

### Get Booking by ID

-   **Endpoint:** `/bookings/:id`
-   **Method:** `GET`
-   **Description:** Get details of a specific booking by ID.

### Create Booking

-   **Endpoint:** `/bookings`
-   **Method:** `POST`
-   **Description:** Create a new hotel booking.

### Update Booking

-   **Endpoint:** `/bookings/:id`
-   **Method:** `PATCH`
-   **Description:** Update details of a specific booking by ID.

### Delete Booking

-   **Endpoint:** `/bookings/:id`
-   **Method:** `DELETE`
-   **Description:** Delete a specific booking by ID.

## Photos

### Get Photos

-   **Endpoint:** `/photos`
-   **Method:** `GET`
-   **Description:** Get all photos.

### Get Photo by ID

-   **Endpoint:** `/photos/:id`
-   **Method:** `GET`
-   **Description:** Get details of a specific photo by ID.

### Create Photo

-   **Endpoint:** `/photos`
-   **Method:** `POST`
-   **Description:** Create a new photo (admin only).

### Update Photo

-   **Endpoint:** `/photos/:id`
-   **Method:** `PATCH`
-   **Description:** Update details of a specific photo by ID (admin only).

### Delete Photo

-   **Endpoint:** `/photos/:id`
-   **Method:** `DELETE`
-   **Description:** Delete a specific photo by ID (admin only).

## Room Reviews

### Get Room Reviews

-   **Endpoint:** `/room-reviews`
-   **Method:** `GET`
-   **Description:** Get all room reviews.

### Get Room Review by ID

-   **Endpoint:** `/room-reviews/:id`
-   **Method:** `GET`
-   **Description:** Get details of a specific room review by ID.

## Rooms

### Get Rooms

-   **Endpoint:** `/rooms`
-   **Method:** `GET`
-   **Description:** Get all rooms.

### Get Room by ID

-   **Endpoint:** `/rooms/:id`
-   **Method:** `GET`
-   **Description:** Get details of a specific room by ID.

### Create Room

-   **Endpoint:** `/rooms`
-   **Method:** `POST`
-   **Description:** Create a new room (admin only).

### Update Room

-   **Endpoint:** `/rooms/:id`
-   **Method:** `PATCH`
-   **Description:** Update details of a specific room by ID (admin only).

### Delete Room

-   **Endpoint:** `/rooms/:id`
-   **Method:** `DELETE`
-   **Description:** Delete a specific room by ID (admin only).

## Users

### Get Users

-   **Endpoint:** `/users`
-   **Method:** `GET`
-   **Description:** Get all users (admin only).

### Get User by ID

-   **Endpoint:** `/users/:id`
-   **Method:** `GET`
-   **Description:** Get details of a specific user by ID (admin only).

### Create User

-   **Endpoint:** `/users`
-   **Method:** `POST`
-   **Description:** Create a new user (admin only).

### Update User

-   **Endpoint:** `/users/:id`
-   **Method:** `PATCH`
-   **Description:** Update details of a specific user by ID (admin only).

### Delete User

-   **Endpoint:** `/users/:id`
-   **Method:** `DELETE`
-   **Description:** Delete a specific user by ID (admin only).

Thank you for choosing BookID Server! We hope it makes your hotel booking app development a breeze. If you have any questions or need assistance, please refer to the API documentation or contact our support team. Happy coding!
