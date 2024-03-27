import { get } from "svelte/store";
import { currentAuth0Client } from "../stores";

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
  return new Promise((resolve, reject) => {
    const user = testUsers.find((user) => user.auth0Id == auth0Id);
    if (user) {
      resolve(user);
    } else {
      reject("User not found");
    }
  });
};

export const postListByAuthors = async (authors) => {
  return new Promise((resolve, reject) => {
    resolve([{ postId: 1 }, { postId: 2 }, { postId: 3 }]);
  });
};

export const getPostData = async (id) => {
  return new Promise((resolve, reject) => {
    resolve({
      id: id,
      caption: "this is a nice frog ",
      pic: "https://aws.masdfasdf.png",
      author: 1,
    });
  });
};
