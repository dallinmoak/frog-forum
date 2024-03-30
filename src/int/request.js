import { get } from "svelte/store";
import { currentAuth0Client } from "../stores";

const testUsers = [
  {
    _id: "66073d9d3622a1894e2b7d97",
    auth0Id: "auth0|65fe1ce1f2e86684187f2abd",
    firstName: "Testy",
    lastName: "McTesterson",
    birthday: "2000-01-01T07:00:00.000Z",
    profilePicUrl:
      "https://s.gravatar.com/avatar/dd46a756faad4727fb679320751f6dea?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
    email: "test@test.test",
  },
  {
    _id: "1",
    auth0Id: "auth0|65fe1ce1f2e86684187f2abd",
    firstName: "John",
    lastName: "Doe",
    birthday: "2000-01-01T07:00:00.000Z",
    profilePicUrl:
      "https://s.gravatar.com/avatar/dd46a756faad4727fb679320751f6dea?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
    email: "john@doe.doe",
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
    const user = testUsers.find((user) => user._id == id);
    if (user) {
      resolve(user);
    } else {
      reject("User not found");
    }
  });
};

export const userByAuth0Id = async (auth0Id) => {
  const thisToken = await token();
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/users/${auth0Id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${thisToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data;
  // -----------------------------------------
  // return new Promise((resolve, reject) => {
  //   const user = testUsers.find((user) => user.auth0Id == auth0Id);
  //   if (user) {
  //     resolve(user);
  //   } else {
  //     reject("User not found");
  //   }
  // });
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
      author: 1,
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

export const followingByUser = async (id) => {
  return new Promise((resolve, reject) => {
    resolve([1, 2, 3]);
  });
};
