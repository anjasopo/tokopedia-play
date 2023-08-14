<h1 align="center">Tokopedia Play Clone</h1>

<p align="center">A video streaming platform inspired by Tokopedia's design, showcasing videos, products, and interactive comments.</p>

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Features](#features)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Custom Hooks](#custom-hooks)
  - [useComment](#usecomment)
  - [useFetch](#usefetch)
- [Bonus Features](#bonus-features)
- [Technical Stack](#technical-stack)
  - [Frontend](#frontend-1)
  - [Backend](#backend-1)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API](#api)
  - [Video API](#video-api)
  - [Product API](#product-api)
  - [Comment API](#comment-api)
- [Database](#database)
- [Backend](#backend-2)
- [Frontend](#frontend-2)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Tokopedia Play Clone is a video streaming platform that brings the immersive experience of Tokopedia's video content to life. This project replicates key features of Tokopedia Play, including videos, products, comments, and more.

## Features

### Frontend

1. **Home Page:** Discover and explore a curated collection of videos with captivating thumbnail images from YouTube.
2. **Video Detail Page:** Immerse yourself in the world of a specific video with an embedded YouTube player, related products, comments, and an interactive comment submission form.
3. **Comment Submission:** Express your thoughts and opinions by submitting comments, complete with your name and comment content.
4. **Real-time Comments:** Stay engaged with real-time comment updates using WebSocket or server-side events.
5. **User Profile:** Personalize your experience with a user profile picture and username, displayed conveniently at the left comment.
6. **Search Functionality:** Seamlessly discover content with an intuitive search bar in the Navbar.

### Backend

1. **Video API:** Access a wide range of videos, each with detailed information.
2. **Product API:** Explore a diverse collection of products, each with comprehensive details.
3. **Comment API:** Engage with comments for videos and contribute your insights.

## Custom Hooks

This project utilizes custom hooks to manage and encapsulate specific functionalities that are reused across multiple components. Custom hooks are a powerful way to share stateful logic and make your code more organized and modular.

### useComment

The `useComment` hook handles the logic for posting comments and fetching comments related to a specific video. It abstracts the process of making POST and GET requests for comments using the Axios library.

Here's an example of how the `useComment` hook is used in the `VideoDetail` component to manage comments for a specific video:

```jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useComment from "../hooks/useComment";

const VideoDetail = () => {
  let { idData } = useParams();
  const { comments, postingError, postComment, fetchComments } = useComment(idData);

  // Rest of your component code...
};

export default VideoDetail;
```

### useFetch

The `useFetch` hook is used to fetch data from an API endpoint. It abstracts the process of making a GET request using the Axios library and provides the fetched data, loading state, and error state.

Here's an example of how the `useFetch` hook is used in the `Home` component to fetch a list of videos:

```jsx
import React from "react";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/api/videos`
  );

  // Rest of your component code...
};

export default Home;
```

These custom hooks provide a clean and efficient way to manage complex functionality within your components.

For more details about the implementation of these custom hooks and how they work, you can refer to the respective hook files in the `src/hooks` directory.

## Bonus Features

1. **User Profile Picture and Username:** Elevate the user experience by displaying user profile pictures and usernames.
2. **Real-time Comment Updates:** Elevate the interactivity with real-time comment updates, offering an engaging and dynamic platform.
3. **Search Functionality:** Enhance content discoverability through a robust search functionality.

## Technical Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- DaisyUI
- React Query

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- WebSocket or Server-Side Events
- Nodemon

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas database.

### Installation

1. Clone this repository to your local machine.
2. Navigate to the frontend folder and run `npm install`.
3. Navigate to the backend folder and run `npm install`.

### Running the Application

1. Start the frontend application:
   - Navigate to the frontend folder.
   - Run `npm start`.

2. Start the backend server:
   - Navigate to the backend folder.
   - Run `npm start` or `node index.js`

   for automatic server restart during development.

## API

The backend provides the following API endpoints:

### Video API

- `GET /api/videos`: Fetch a list of videos with thumbnails.

  Example: `https://tokpedplay.cyclic.cloud/api/videos`

- `GET /api/videos/:videoId`: Fetch details of a specific video.

  Example: `https://tokpedplay.cyclic.cloud/api/videos/Video1`

### Product API

- `GET /api/products`: Fetch a list of products.

  Example: `https://tokpedplay.cyclic.cloud/api/products`

- `GET /api/products/:productId`: Fetch details of a specific product.

  Example: `https://tokpedplay.cyclic.cloud/api/products/Product1`

### Comment API

- `GET /api/comments`: Fetch comments for videos.

  Example: `https://tokpedplay.cyclic.cloud/api/comments`

- `GET /api/comments?videoID=Video1`: Fetch comments related to "Video1".

  Example: `https://tokpedplay.cyclic.cloud/api/comments?videoID=Video1`

- `POST /api/submit-comment`: Submit a new comment.

  Example: `https://tokpedplay.cyclic.cloud/api/submit-comment`

  Payload Example:
  ```json
  {
    "username": "JohnDoe",
    "comment": "Video dan produknya keren!",
    "videoID": "Video1"
  }
  ```

## Database

This project utilizes MongoDB Atlas, a cloud-based database service, to store and manage data efficiently. MongoDB Atlas offers scalability, security, and ease of use, making it an ideal choice for the backend data storage.

## Backend

The backend server is accessible at:

https://tokpedplay.cyclic.cloud

For more in-depth information about the backend implementation, including API endpoints, database schema, and technical details, please refer to the [backend/README.md](../backend/README.md) file.

## Frontend

The frontend of this project has been deployed on Netlify. You can access the frontend at the following URL:

[https://tokopedia-play.netlify.app](https://tokopedia-play.netlify.app)

## Contributing

Contributions are welcome! Feel free to create pull requests or open issues.

## License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  Made with ❤️ by [Anjas Susetya](https://github.com/anjasopo)
</div>