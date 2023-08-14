# Tokopedia Play Clone - Backend

## Table of Contents
- [Introduction](#introduction)
- [Database Structure](#database-structure)
- [API Structure](#api-structure)
- [List of API Endpoints](#list-of-api-endpoints)
- [How to Run Locally](#how-to-run-locally)

## Introduction

This repository contains the backend implementation of the Tokopedia Play Clone, a video streaming platform. The backend is built using Node.js, Express.js, and MongoDB.

## Database Structure

The MongoDB database used for this project contains three collections: `Video`, `Product`, and `Comment`.

### Video Collection

The `Video` collection stores information about the videos available on the platform. Each video document has the following fields:

- `videoID`: A unique identifier for the video.
- `urlImageThumbnail`: The URL of the video's thumbnail image.
- `titleImageThumbnail`: The title of the video.

### Product Collection

The `Product` collection stores information about the products related to the videos. Each product document has the following fields:

- `productID`: A unique identifier for the product.
- `urlProduct`: The URL of the product's image.
- `titleProduct`: The title of the product.
- `priceProduct`: The price of the product.
- `videoID`: The ID of the video that the product is related to.

### Comment Collection

The `Comment` collection stores user comments for the videos. Each comment document has the following fields:

- `username`: The username of the user who submitted the comment.
- `comment`: The content of the comment.
- `timestamp`: The timestamp when the comment was submitted.
- `videoID`: The ID of the video that the comment is related to.

## API Structure

The backend follows a RESTful API design, using Express.js to handle routes and controllers to handle the logic for each endpoint.

- The `videoController.js` handles video-related API endpoints.
- The `productController.js` handles product-related API endpoints.
- The `commentController.js` handles comment-related API endpoints.

## List of API Endpoints

### 1. Video Thumbnail List - GET

- **Endpoint:** `/api/videos`
- **Description:** Fetches a list of all videos with their thumbnail information.
- **Response:** An array of video objects, each containing `videoID`, `urlImageThumbnail`, and `titleImageThumbnail`.
- **Arguments/Payloads:** You can use the `search` query parameter to perform a case-insensitive search for videos. For example, `/api/videos?search=Video1` will fetch all videos with `videoID` or `titleImageThumbnail` containing "Video1".

### 2. Video Details with VideoID - GET

- **Endpoint:** `/api/videos/:videoId`
- **Description:** Fetches the details of a specific video by its `videoId`.
- **Response:** A video object containing `videoID`, `urlImageThumbnail`, and `titleImageThumbnail`.

### 3. Product List - GET

- **Endpoint:** `/api/products`
- **Description:** Fetches a list of all products related to videos.
- **Response:** An array of product objects, each containing `productID`, `urlProduct`, `titleProduct`, `priceProduct`, and `videoID`.
- **Arguments/Payloads:** You can use the `search` query parameter to perform a case-insensitive search for products. For example, `/api/products?search=Product1` will fetch all products with `productID` or `titleProduct` containing "Product1". You can also use the `videoID` query parameter to filter the products by the ID of the video they are related to. For example, `/api/products?videoID=Video1` will fetch all products related to "Video1".

### 4. Product Details with ProductID - GET

- **Endpoint:** `/api/products/:productId`
- **Description:** Fetches the details of a specific product by its `productId`.
- **Response:** A product object containing `productID`, `urlProduct`, `titleProduct`, `priceProduct`, and `videoID`.

### 5. Comment List - GET

- **Endpoint:** `/api/comments`
- **Description:** Fetches a list of all comments for videos.
- **Response:** An array of comment objects, each containing `username`, `comment`, `timestamp`, and `videoID`.
- **Arguments/Payloads:** You can use the `search` query parameter to perform a case-insensitive search for comments. For example, `/api/comments?search=Video1` will fetch all comments with `videoID` containing "Video1". You can also use the `videoID` query parameter to filter the comments by the ID of the video they are related to. For example, `/api/comments?videoID=Video1` will fetch all comments related to "Video1".

### 6. Submit Comment - POST

- **Endpoint:** `/api/submit-comment`
- **Description:** Submits a new comment for a video.
- **Payload:** An object containing `username`, `comment`, and `videoID`.
  Example Request:
  ```json
  POST /api/submit-comment
  Content-Type: application/json
  
  {
    "username": "JohnDoe",
    "comment": "Video dan produknya keren!",
    "videoID": "Video1"
  }
  ```

- **Response:** A success message if the comment is submitted successfully.
  Example Response:
  ```json
  {
    "message": "Comment submitted successfully",
    "comment": {
      "username": "JohnDoe",
      "comment": "Video dan produknya keren!",
      "videoID": "Video1",
      "timestamp": "2023-07-28T12:34:56.789Z"
    }
  }
  ```

## How to Run Locally

To run the backend API locally on your machine, follow these steps:

1. Clone this repository to your local machine.
2. Install Node.js and npm if you haven't already.
3. Install the required dependencies by running `npm install` in the project root directory.
4. Set up a MongoDB database locally or use a cloud-based service and update the `.env` file with the appropriate `DATABASE_URL`.
5. Start the server by running `npm start`. The server will start running at `http://localhost:3000`.

Once the server is running, you can use a tool like Postman to test the API endpoints and interact with the backend.