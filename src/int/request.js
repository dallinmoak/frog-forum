import { get } from "svelte/store";
import { currentAuth0Client } from "../stores";
import { data } from "autoprefixer";

const testUsers = [
  {
    id: 1,
    name: "John Doe",
    auth0Id: "auth0|65fe1ce1f2e86684187f2abd",
    picture:
      "https://s.gravatar.com/avatar/dd46a756faad4727fb679320751f6dea?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
    email: "test@test.test",
    following: [2, 3],
  },
];
const token = async () => {
  const token = await get(currentAuth0Client).getTokenSilently();
  return token;
};

export const userById = async (id) => {
  // const thisToken = await token();
  // const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${id}`, {
  //   method: "GET",
  //   headers: {
  //     authorization: `Bearer ${thisToken}`,
  //   },
  // });
  // const user = await res.json();
  // return user;
  //-----------------------------------------
  return new Promise((resolve, reject) => {
    const user = testUsers.find((user) => user.id == id);
    if (user) {
      resolve(user);
    } else {
      reject("User not found");
    }
  });
};

export const userByAuth0Id = async (auth0Id) => {
  // const thisToken = await token();
  // const res = await fetch(
  //   `${import.meta.env.VITE_SERVER_URL}/users/auth0/${auth0Id}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       authorization: `Bearer ${thisToken}`,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const data = await res.json();
  // return data;
  // -----------------------------------------
  return new Promise((resolve, reject) => {
    const user = testUsers.find((user) => user.auth0Id == auth0Id);
    if (user) {
      resolve(user);
    } else {
      reject("User not found");
    }
  });
};

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
  console.log(posts);
  const flatPosts = posts.flat();
  console.log(flatPosts);
  const stortedPosts = flatPosts.sort((a, b) => a.date - b.date);
  console.log(stortedPosts);
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
      caption: "A frog on a skateboard",
      author: 1,
      date: new Date(
        "Tue Mar 26 2024 12:00:00 GMT-0600 (Mountain Daylight Time)"
      ),
      id,
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
