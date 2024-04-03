import { intializeFollowers } from "./followers";
import { intializeFollowing } from "./following";
import { token } from "./main";

export const allUsers = async () => {
  const thisToken = await token();
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${thisToken}`,
    },
  });
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data;
};

export const userById = async (id) => {
  const thisToken = await token();
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${thisToken}`,
    },
  });
  if (!res.ok) throw new Error(res.statusText);
  const user = await res.json();
  return user;
};

export const userByAuth0Id = async (auth0Id) => {
  const thisToken = await token();
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/users/auth0/${auth0Id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${thisToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data;
};

export const createUser = async (user) => {
  const thisToken = await token();
  const sendUser = JSON.stringify(user);
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${thisToken}`,
    },
    body: sendUser,
  });
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  const followers = await intializeFollowers(data.insertedId);
  const following = await intializeFollowing(data.insertedId);
  if (!followers || !following)
    throw new Error("error initializing follow(ers/ing)");
  return data;
};
