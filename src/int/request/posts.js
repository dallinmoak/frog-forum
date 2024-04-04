import { token } from "./main";

export const PostListByAuthor = async (author) => {
  // const thisToken = await token();
  // const res = await fetch(
  //   `${import.meta.env.VITE_SERVER_URL}/posts/author/${author}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `Bearer ${thisToken}`,
  //     },
  //   }
  // );
  // if (!res.ok) throw new Error(res.statusText);
  // const data = await res.json();
  // -----------------------------------------
  return new Promise((resolve, reject) => {
    resolve([{ postId: 1 }, { postId: 2 }, { postId: 3 }]);
  });
};

export const postListByAuthors = async (authors) => {
  const thisToken = await token();
  const authorString = authors.join(",");
  const endpoint = `${import.meta.env.VITE_SERVER_URL}/posts/${authorString}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${thisToken}`,
    },
  };
  const res = await fetch(endpoint, options);
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data;
};

export const postById = async (id) => {
  const thisToken = await token();
  const endpoint = `${import.meta.env.VITE_SERVER_URL}/posts/by-id/${id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${thisToken}`,
    },
  };
  const res = await fetch(endpoint, options);
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data;
};

export const createPost = async (post) => {
  const sendPost = JSON.stringify({
    authorId: post.author,
    image: post.pic,
    caption: post.caption,
  });
  const thisToken = await token();
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${thisToken}`,
    },
    body: sendPost,
  });
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data;
};
