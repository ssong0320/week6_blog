import React, { useState } from "react";
import axios from "axios";

const Edit = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put('http://localhost:5001/blogedit', { id, title, author, content });
      setId('');
      setTitle('');
      setAuthor('');
      setContent('');
    } catch (error) {
      console.error('Error editing blog:', error.response?.data || error.message);
    }
  };

  return (
    <div className="create">
      <h1 className="create_header">Edit Blog</h1>
      <form onSubmit={handleEditSubmit}>
        <label>ID:</label><br />
        <input type="number" value={id} onChange={(e) => setId(e.target.value)} required /><br />

        <label>New Title:</label><br />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />

        <label>New Author:</label><br />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} /><br />

        <label>New Content:</label><br />
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} /><br />

        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default Edit;

