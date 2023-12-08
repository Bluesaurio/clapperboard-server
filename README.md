# Clapperboard

## [Click here to see the App!](https://clapperboard-app.netlify.app/)

![App Logo](./public/ClapperboardBold.png)

## Description

**NOTE -** Describe your project in one/two lines.

#### [Client Repo here](https://github.com/raulgarrigos/clapperboard-client)

#### [Server Repo here](https://github.com/raulgarrigos/clapperboard-server)

## Backlog Functionalities

Favourites, Watchlist, About page, chat between users, admin powers, more movie details, search by other querys than movie titles.

## Technologies used

HTML, CSS, Javascript, Express, React, axios, React Context, The Movie Database API, Bootstrap, Vite launcher, Cloudinary.

# Server Structure

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true, trim: true},
  email: {type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true},
  password: {type: String, required: [true, "Password is required"]},
  role: {type: String, enum: ["user", "admin"], default: "user"},
  firstName: String,
  lastName: String,
  bio: String,
  location: String,
  pronouns: {type: String, enum: ["he/him", "she/her", "they/them"]}
}
```

Review model

```javascript
 {
   rating: {type: Number, required: true, enum: [1, 2, 3, 4, 5]},
   text: String,
   creatorId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
   creator: String,
   filmId: Number,
   picture: String,
   movieTitle: String
 }
```

List model

```javascript
 {
   name: {type: String, required: true},
   description: String,
   category: {type: String, enum: ["Favorites", "Watchlist", "Custom"], required: true},
   listPic: String,
   creatorId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
   filmDetails: {apiId: Number, title: String, image: String}
 }
```

## API Endpoints (backend routes)

| HTTP Method | URL                                              | Request Body                                   | Success status | Error Status | Description                                                                                                  |
| ----------- | ------------------------------------------------ | ---------------------------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| POST        | `/auth/register`                                 | {name, email, password}                        | 201            | 400          | Registers the user in the Database and sends Token                                                           |
| POST        | `/auth/login`                                    | {username, password}                           | 200            | 400          | Validates credentials, creates and sends Token                                                               |
| GET         | `/auth/verify`                                   |                                                | 200            | 401          | Verifies the user Token                                                                                      |
| GET         | `/movie/popular`                                 |                                                | 200            | 400          | Show a list of popular movies from the API                                                                   |
| GET         | `/movie/:movieId/details`                        |                                                | 201            | 400          | Show details from a specific movie from the API                                                              |
| GET         | `/movie/:search/results`                         | {query}                                        | 200            | 400          | Show all movies with their title related with what we are searching                                          |
| GET         | `/profile/:userId`                               |                                                | 200            | 400          | Shows a user profile (own or outer)                                                                          |
| PUT         | `/profile`                                       | {firstName, lastName, bio, location, pronouns} | 200            | 401          | Edits user profile (own)                                                                                     |
| PATCH       | `/profile/image`                                 |                                                | 200            | 401          | Edits user's profile image (own) details                                                                     |
| GET         | `/profile/:userId/reviews`                       |                                                | 200            | 400, 401     | Shows all user's reviews                                                                                     |
| POST        | `/profile/:userId/lists`                         | {name, description, category}                  | 200            | 401          | Creates a new list of movies                                                                                 |
| GET         | `/profile/:userId/lists`                         |                                                | 200            | 401          | Shows all lists created by that user                                                                         |
| GET         | `/profile/:userId/lists/:listId`                 |                                                | 200            | 401          | Shows details from a specific list of that user                                                              |
| PUT         | `/profile/:userId/lists/:listId`                 | {name, description}                            | 200            | 401          | Edits a user's list (own)                                                                                    |
| DELETE      | `/profile/:userId/lists/:listId`                 |                                                | 200            | 401          | Deletes a user's list (own)                                                                                  |
| PATCH       | `/profile/:userId/lists/:listId/:movieId`        |                                                | 200            | 401          | Adds a film to the list                                                                                      |
| PATCH       | `/profile/:userId/lists/:listId/:movieId/delete` |                                                | 200            | 401          | Deletes a film from the list (own)                                                                           |
| POST        | `/review/:movieId`                               | {text, rating}                                 | 200            | 401          | Creates a review                                                                                             |
| GET         | `/review/:movieId`                               |                                                | 200            | 401          | Shows all reviews from a movie                                                                               |
| GET         | `/review/:movieId/:userId`                       |                                                | 200            | 401          | Finds a review with the same ID as the user's reviews to know if he has already done a review from that film |
| PUT         | `/review/:reviewId`                              |                                                | 200            | 401          | Edits a specific review                                                                                      |
| DELETE      | `/review/:reviewId`                              |                                                | 200            | 401          | Deletes a review                                                                                             |
| POST        | `/upload`                                        |                                                | 200            | 401          | Gets access to Cloudinary and uploads the profile picture (own)                                              |

## Links

### Collaborators

[Raúl Garrigós](https://github.com/raulgarrigos)

### Project

[https://github.com/raulgarrigos/clapperboard-client](https://github.com/raulgarrigos/clapperboard-client)

[https://github.com/raulgarrigos/clapperboard-server](https://github.com/raulgarrigos/clapperboard-server)

[https://clapperboard-app.netlify.app/](https://clapperboard-app.netlify.app/)
