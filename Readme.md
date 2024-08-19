# BookMate

**BookMate** is a Book Exchange web application that enables users to exchange books with others who share similar reading interests. Users can list the books they own and want to trade, browse books from other users, and initiate exchange requests. The platform also includes a matchmaking feature that suggests potential matches based on user preferences.

## Features

- **User Authentication:** Secure registration and login using JWT.
- **Book Management:** Add, edit, and delete books from your personal library.
- **Explore Books:** Browse books from other users with filtering by genre and serach by the name of books.
- **Exchange Requests:** Send, receive, and manage book exchange requests with other users.
- **Matchmaking:** Get personalized book matches based on your preferences and available books.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Real-time Notifications:** Instant updates on the status of exchange requests.

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Axios
  - React Hook Form with Zod
  - React Router DOM
  - Redux (for state management)

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - TypeScript
  - Mongoose

- **Other Tools:**
  - JWT for Authentication
  - Bcrypt for Password Hashing
  - Cloudinary for picture storage
  - React Hot Toast for Notifications

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. **Clone the Repository:**
   ```bash
   1. git clone https://github.com/PrtHub/bookmate.git
   2. cd bookmate 
   ```
2. **Backend Setup:**
   - Navigate to the backend directory
   ```bash
   cd server
    ```
   - Install dependencies:   
   ```bash
   npm install
    ``` 
   - Create a .env file in the server directory and add the following:
   ```bash
   PORT=""
   MONGO_URI=""
   JWT_SECRET=""
   CLIENT_URL=""

   CLOUDINARY_CLOUD_NAME=""
   CLOUDINARY_API_KEY=""
   CLOUDINARY_API_SECRET=""
   ```
   - Start the server:
    ```bash
    npm run dev
    ```
    
3. **Frontend Setup:**
   - Navigate to the frontend directory
   ```bash
   cd client
    ```
   - Install dependencies:   
   ```bash
   npm install
    ``` 
   - Create a .env file in the server directory and add the following:
   ```bash
    VITE_BACKEND_API_URL=""
   ```
   - Start the server:
    ```bash
    npm run dev
    ```

4. **Access the Application:**

   - Open your browser and navigate to http://localhost:5173 to access the platform.   


## Contributing

I welcome contributions! Please feel free to submit issues, fork the repository, and create pull requests.

