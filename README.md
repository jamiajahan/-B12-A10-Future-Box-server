# Community Cleanliness Portal - Server

[cite_start]This repository contains the backend server for the Community Cleanliness & Issue Reporting Portal[cite: 1]. [cite_start]It is built with Node.js, Express.js, and MongoDB[cite: 4].

### Features
* Handles user authentication
* Manages "Issues" CRUD operations
* Stores and retrieves user "Contributions"
* Provides all data for the React client

### API Endpoints
* `POST /issues` - Add a new issue
* `GET /issues` - Get all issues
* `GET /issues/:id` - Get a single issue
* ... (add more as you build them)

### Setup
1.  Clone the repo
2.  Run `npm install`
3.  Create a `.env` file and add `PORT`, `DB_USER`, and `DB_PASS`
4.  Run `npm start`