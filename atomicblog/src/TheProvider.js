import { React, createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

function RandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const CreatedContext = createContext();

function TheProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 5 }, () => RandomPost())
  );
  const [search, setSearch] = useState('');

  const searchedPosts =
    search.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : posts;

  function handleClearPosts() 
  {
    setPosts([]);
  }

  function handleAddPost(post) 
  {
    setPosts((posts) => [post, ...posts]);
  }

  return (
    <CreatedContext.Provider
      value={{
        posts: searchedPosts,
        setPosts,
        search,
        setSearch,
        searchedPosts,
        handleClearPosts,
        handleAddPost,
      }}
    >
      {children}
    </CreatedContext.Provider>
  );
}

function useCon() 
{
  const con = useContext(CreatedContext);
  if (!con) {
    throw new Error("useCon must be used within a TheProvider");
  }
  return con;
}

export { TheProvider, useCon };

