# Technical Assessment

## Project Structure
This project is managed with [nx.dev](https://nx.dev/).
```
# To Run the backend
npx nx run backend:serve

# To Run the frontend
npx nx run frontend:serve
```

## Pre-Requirements
- Use node `v20`
- Setup any database you want

## Requirements

### Authentication
- Implement a simple login page (username, password). NO NEED to create registration, forgot password, and other authentication flows.
- Since there is no registration flow, predefine at least 2 users with different roles on the database(Editor and Viewer).

### - This is done, used: (see sreenshots in screenshots folder) 
 - JWT for access-token & refresh-token,
 - Prisma ORM for database connection & management,
 - SQLite for the database (for demo)
 - Express.js middleware pattern
 - bcrypt for password hashing
 - Access and refresh tokens are both working and expiring

### Dashboard
- This is the main page after the user is authenticated.
- Use any 3rd party API to retrieve weather data.
- Show the weather data per City.
- It should allow filter/search by City.

### I riched this part, I run out of time (see video clip on how my code worked in the screencasts folder)
 - No CSS/UI library invovled (run out of time)
 - receives access-token and refresh-token upon successful login
 - access-token and refresh token is kept in a Context API (LoginContext)
 - City search is working
 - Weather aquisition per city from weather API is wokring
 - Cors applied at the backend

### Add/Remove Notes
- Users can click on a weather item, you can redirect the user to another page or use a modal to show the notes.
- The Editor can add/delete notes linked to the weather item.
- The Viewer should be able to see the notes.

## Technical Limitations
- You are free to use common libraries to help achieve the requirements. (ex. react-query, trpc, zustand, redux, lodash, ramda)
- For the UI part, it is highly recommended to only use `emotion` for creating the components.

## Submission
- Commit your changes in the repository
- For additional setup on how to run the project (ex. Database setup/migration). You may edit the `Pre Requirements` Part of this README file
- Notify the recruitment team once everything is done.
- We will do a quick check of your changes and schedule you for the final interview once everything's good
- You will be asked to demo the project and discuss on how you implemented the requirements. 

