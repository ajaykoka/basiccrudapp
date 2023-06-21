import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async () => {
    try {
      const response = await axios.post(API_URL, { title: newPost });
      setPosts([...posts, response.data]);
      setNewPost('');
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>CRUD App</h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new post"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={createPost}>
          Add Post
        </button>
      </div>

      <ul className="list-group">
        {posts.map((post) => (
          <li className="list-group-item" key={post.id}>
            {post.title}
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => deletePost(post.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
