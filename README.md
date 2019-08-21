# Social Media App

## Onboarding Guide

### Prerequisites

For local development and production server

* [Node >=10.16.3](https://nodejs.org/en/)
* [Npm >=6.0.0](https://www.npmjs.com/)

### Development Setup

* Clone repo

* Install dependencies

```bash
$ npm install
```

* Run local development server in background

```bash
$ npm start
# local server will run at localhost:9000
```

## Available Scripts

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:9000](http://localhost:0000) to view it in the browser.

### `npm test`

Launches the test runner.

### `npm run build`

Builds the app for production to the `dist` folder.

## Features

### View List of All Posts
* URL: `/`

### View List of All Users
* URL: `/users`

### View List of Posts of each Users
* URL: `/users/:userId/posts`, eg: `/users/1/posts`

### View List of Albums of each Users
* URL: `/users/:userId/albums`, eg: `/users/1/albums`

### View Detail of each Post and Its Comment
* URL:
    * `/`, or
    * `/users/:userId/posts`, eg: `/users/1/posts`
* Click `Show Comments` button for see post's comments

### View List of Photos from an Album
* URL: `/users/:userId/photos/:albumId`, eg: `/users/1/photos/1`

### View Detail of Photo
* URL: `/users/:userId/photos/:albumId`, eg: `/users/1/photos/1`
* Click the photo for see its detail in popup

### Add, Edit, Delete Post
* URL:
    * `/`, or
    * `/users/:userId/posts`, eg: `/users/1/posts`
* Add:
    * Fill the fields for post and click `Post It!` button
* Edit:
    * Click pencil icon button for the post
    * Fill the fields and click `Post It!` button
* Delete:
    * Click trash bin icon button for the post

### Add, Edit, Delete Comment
* URL:
    * `/`, or
    * `/users/:userId/posts`, eg: `/users/1/posts`
* Click `Show Comments` button for see post's comments
* Add:
    * Fill the fields for comment and click `Post It!` button
* Edit:
    * Click pencil icon button for the comment
    * Fill the fields and click `Post It!` button
* Delete:
    * Click trash bin icon button for the comment

## Assumptions
* User can edit and delete which post they want (no restriction of which post belongs to whom)
* User can edit and delete which comment they want (no restriction of which comment belongs to whom)
* All posted time for posts and comments is `1 day ago`
* User's avatar is added for design purpose
* Add post and comment always using userId = 1
