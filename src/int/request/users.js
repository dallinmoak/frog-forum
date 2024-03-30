import { token } from "./main";

export const userById = async (id) => {
  const thisToken = await token();
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${thisToken}`,
    },
  });
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
  const data = await res.json();
  return data;
};
