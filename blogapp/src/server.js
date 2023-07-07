const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: '34.27.144.22',
    user: 'root',
    password: '%%56Hu3#PB:zdy%D',
    database: 'ti_workshop_steven',
    port: 3306
});


connection.connect((error) => {
    if (error) {
      console.error('Failed to connect to the database:', error);
    } else {
      console.log('Connected to the database');
    }
});


app.get('/bloglist', (req, res) => {
    const query = 'SELECT * FROM blogs';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Failed to retrieve blogs from the database:', error);
        res.status(500).json({ error: 'Failed to retrieve blogs from the database.' });
      } else {
        res.json(results);
      }
    });
  });
  

  app.post('/blogadd', (req, res) => {
    const { id, title, author, content } = req.body;
  
    // Check if required fields are provided
    if (!id || !title || !author || !content)  {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
  
    const query = 'INSERT INTO blogs VALUES(?, ?, ?, ?)';
    const values = [id, title, author, content];
  
    connection.query(query, values, (error, result) => {
      if (error) {
        console.error('Failed to add blog to the database:', error);
        
        res.status(500).json({ error: 'Failed to add blog to the database.' });
      } else {
        res.status(201).json({ id, title, author, content });
        console.log( 'Added Blog: ', { id, title, author, content });
      }
    });
  });

  
  app.delete("/blogdelete", (req, res) => {
    const blogId = req.body.id;
    const query = 'DELETE FROM blogs WHERE id = ?';
  
    connection.query(query, [blogId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Failed to delete blog.' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Blog not found.' });
      } else {
        res.status(200).json({ message: 'Blog deleted successfully.' });
        console.log('Delete blog: ', {blogId});
      }
    });
  });
  
  
  app.put("/blogedit", (req, res) => {
    const { id, title, author, content } = req.body;
  
    const query = 'UPDATE blogs SET title = ?, author = ?, content = ? WHERE id = ?';
  
    connection.query(query, [title, author, content, id], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Failed to update blog.' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Blog not found.' });
        console.log('Blog not found.');
      } else {
        res.status(200).json({ message: 'Blog updated successfully.' });
        console.log('Blog updated successfully.')
      }
    });
  });
  
  
  app.listen(5001, () => {
      console.log('Server running on http://localhost:5001');
    });