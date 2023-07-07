import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


export default function Body({ posts }) {

  const [users, setUsers] = useState([]);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('http://localhost:5001/bloglist');
            setUsers(res.data)
        }
        catch (error) {
            console.log('Failed to get the blogs', error);
        };
    };

    const deleteBlog = async (id) => {
      try {
        await axios.delete(`http://localhost:5001/blogdelete`, { data: { id } });
        fetchBlogs(); // Fetch the updated blog list after deletion
      } catch (error) {
        console.log(`Failed to delete the blog with ID ${id}`, error);
      }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);


  return (
    <main className="container">
      <div className="blog-section">
        <h1>Recent Posts</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{user.id}</th>
                <th>{user.title}</th>
                <th>{user.author}</th>
                <th>{user.content}</th>
                <th>
                  <button onClick={() => deleteBlog(user.id)}>Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
