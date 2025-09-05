# Blog Platform

A full-stack blog platform built with Express.js, EJS templating, and MongoDB for creating and managing blog posts.

## Features

- Express.js backend server
- EJS templating engine for dynamic views
- MongoDB database integration with Mongoose
- RESTful API for blog posts
- Static file serving for assets
- CORS enabled for cross-origin requests
- Request logging with Morgan

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Download MongoDB](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git**: [Download Git](https://git-scm.com/downloads)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/bvfr/Post-Dashboard
cd "Blog Platform"
```

### 2. Install Dependencies

```bash
npm install
```

The project uses the following dependencies:
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `ejs` - Templating engine
- `body-parser` - Parse incoming request bodies
- `cors` - Enable CORS
- `morgan` - HTTP request logger

### 3. Database Setup

Make sure MongoDB is running on your system:

**Local MongoDB:**
```bash
mongod
```

**Or configure MongoDB Atlas connection** by updating the mongoose connection string in your code.

## Project Structure

```
Blog Platform/
├── server.js          # Main server file
├── routes/
│   └── posts.js       # Blog posts routes
├── models/            # MongoDB models
├── views/             # EJS templates
│   └── index.ejs      # Home page template
├── public/            # Static assets (CSS, JS, images)
└── package.json       # Project dependencies
```

## Running the Project

### Development Mode

```bash
node server.js
```

The server will start on `http://localhost:3000` (or the port specified in your environment variables).

### Using nodemon for Development

Install nodemon globally for automatic server restarts:
```bash
npm install -g nodemon
nodemon server.js
```

## API Endpoints

- `GET /` - Home page
- `/posts/*` - Blog posts routes (defined in routes/posts.js)

## Usage

1. Start the server
2. Navigate to `http://localhost:3000` in your browser
3. Use the posts API endpoints to create and manage blog posts

## File Structure

- **server.js**: Main application entry point
- **routes/posts.js**: Handles all blog post-related routes
- **views/**: Contains EJS templates for rendering HTML
- **public/**: Static files (CSS, JavaScript, images)
- **models/**: MongoDB schema definitions

## Configuration

The server can be configured using environment variables:
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Ensure MongoDB is running and accessible
2. **Port Already in Use**: Change the PORT environment variable
3. **Module Not Found**: Run `npm install` to install dependencies
4. **Views Not Loading**: Ensure the views directory contains the required EJS files

### Database Connection

If you encounter MongoDB connection issues:
1. Verify MongoDB is running: `mongod --version`
2. Check if the database service is active
3. Ensure the connection string is correct


