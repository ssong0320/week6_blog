import React, { useState } from "react";
import axios from "axios";


const Create = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!id|| !title || !author || !content) {
      return;
    }
    try {
      await axios.post('http://localhost:5001/blogadd', {id, title, author, content });
      setId('');
      setTitle('');
      setAuthor('');
      setContent('');
    } catch (error) {
      console.error('Error adding blog:', error.response?.data || error.message);
    }
  };
    

  return (
    <div className="create">
      <h1 className="create_header">Create New Blog Post</h1>

      <div id="new-blog">
        <form onSubmit={handleSubmit}>
          <label>ID:</label><br />
          <input type="number" id="ID" name="ID" value={id} onChange={(e) => setId(e.target.value)} /><br />

          <label>Title:</label><br />
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />

          <label>Author:</label><br />
          <input type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} /><br />

          <label>Content:</label><br />
          <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea><br />

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
export default Create;