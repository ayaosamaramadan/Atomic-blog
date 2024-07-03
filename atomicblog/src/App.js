
import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useCon, TheProvider } from "./TheProvider";
import "./index.css";

function RandomPost() 
{
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}


function App() 
{
  const [isDark, setIsDark] = useState(false);
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isDark]
  );
  return (
    <>
      <Button setIsDark={setIsDark} isDark={isDark} />
      <TheProvider>
        <Header />
        <FormAddPost />
        <Main />
        <Archive />
      </TheProvider>
    </>
  );
}


function Header() 
{
  const { handleClearPosts, posts, search, setSearch  } = useCon();
  return (
    <>
      <h1> The Atomic Blog</h1>
      <p> {posts.length} posts found</p>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleClearPosts}>Clear posts</button>
      </>
  );
}


function Main() 
{
  const { posts } = useCon();
  return (
    <>
      <section>
        <ul style={{listStyleType:"none"}}>
          {posts.map((post) => (
            <li>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}


function FormAddPost() 
{
  const { handleAddPost } = useCon();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function handlesubmit(e) {
    e.preventDefault();
    if (!title || !body) return;
    handleAddPost({ title, body });
    setTitle('');
    setBody('');
  }

  return (
    <>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="submit">ADD</button>
      </form>
    </>
  );
}


function Archive() 
{
  const { handleAddPost } = useCon();

  const [posts] = useState(() =>
    Array.from({ length: 5 }, () => RandomPost())
  );

  const [show, setShow] = useState(false);

  return (
    <>
      <aside>
        <br />
        <h2>Post archive</h2>
        <button onClick={() => setShow((show) => !show)}>
          {show ? "Hide posts" : "Show posts"}
        </button>

        {show && (
          <ul style={{listStyleType:"none"}}>
            {posts.map((post) => (
              <li>
                <p>
                  <strong>{post.title}:</strong> {post.body}
                </p>
                <button onClick={() => handleAddPost(post)}>
                  Add as new post
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  );
}

function Button({ setIsDark, isDark }) 
{
  return (
    <button
      onClick={() => setIsDark((show) => !show)}
      className="btn-fake-dark-mode"
    >
      {isDark ? '🔆': '😴'}
    </button>
  );
}

export default App;


