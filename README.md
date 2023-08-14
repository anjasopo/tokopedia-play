<h1 align="center">Tokopedia Play Clone</h1>

<p align="center">
  <img src="tokopedia.png" alt="Tokopedia Logo">
</p>

<p align="center">A video streaming platform inspired by Tokopedia's design, showcasing videos, products, and interactive comments.</p>

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Try It Out](#try-it-out)
- [Features](#features)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Custom Hooks](#custom-hooks)
  - [useComment](#usecomment)
  - [useFetch](#usefetch)
- [Bonus Features](#bonus-features)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Tokopedia Play Clone is a video streaming platform that brings the immersive experience of Tokopedia's video content to life. This project replicates key features of Tokopedia Play, including videos, products, comments, and more.

## Try It Out

Experience the Tokopedia Play Clone frontend by visiting the following URL:

[https://tokopedia-play.netlify.app](https://tokopedia-play.netlify.app)

If you're interested in exploring the backend implementation, you can find more information in the [backend/README.md](backend/README.md) file. To get details about the frontend setup and components, refer to the [frontend/README.md](frontend/README.md) file.

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

## Contributing

Contributions are welcome! Feel free to create pull requests or open issues.

## License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  Made with ❤️ by [Anjas Susetya](https://github.com/anjasopo)
</div>