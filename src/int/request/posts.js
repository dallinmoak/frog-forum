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
  // const data = await res.json();
  // -----------------------------------------
  return new Promise((resolve, reject) => {
    resolve([{ postId: 1 }, { postId: 2 }, { postId: 3 }]);
  });
};

export const postListByAuthors = async (authors) => {
  const lists = authors.map((author) => PostListByAuthor(author));
  const posts = await Promise.all(lists);
  const flatPosts = posts.flat();
  //this isn't going to work, cause the post just contains the id
  //will need to ask for sorted posts by authors.
  // select post.id from post where author IN (...authors) order by date;
  const stortedPosts = flatPosts.sort((a, b) => a.date - b.date);
  return stortedPosts;
};

export const postById = async (id) => {
  // const thisToken = await token();
  // const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts/${id}`, {
  //   method: "GET",
  //   headers: {
  //   "Content-Type": "application/json",
  //     authorization: `Bearer ${thisToken}`,
  //   },
  // });
  // const data = await res.json();
  // return data;
  // -----------------------------------------
  return new Promise((resolve, reject) => {
    resolve({
      pic: "https://frog-test-1.s3.us-west-2.amazonaws.com/sample/bite.png",
      caption: "A frog bit me",
      author: "660743113622a1894e2b7d98",
      date: new Date(
        "Tue Mar 26 2024 12:00:00 GMT-0600 (Mountain Daylight Time)"
      ),
      postId: id,
    });
  });
};

export const createPost = async (post) => {
  // const sendPost = JSON.stringify({
  //   //TODO: format to match server
  //   ...post
  // });
  // const thisToken = await token();
  // const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     authorization: `Bearer ${thisToken}`,
  //   },
  //   body: sendPost
  // });
  // const data = await res.json();
  // return data;
  //-----------------------------------------
  return new Promise((resolve, reject) => {
    resolve({ ...post, postId: 1 });
  });
};
