import React, { useState, useEffect } from "react";
import RegistrationForm from "./RegistrationForm";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/wp-json/wp/v2/react_post")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h1>React Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </li>
        ))}
      </ul>
      <RegistrationForm />
    </div>
  );
};

export default App;
