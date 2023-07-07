import React, { useState } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Create from './components/Create';
import Edit from './components/Edit';

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <Header />
      <Body posts={posts} />
      <Create addPost={addPost} />
      <Edit />
    </div>
  );
}

export default App;
