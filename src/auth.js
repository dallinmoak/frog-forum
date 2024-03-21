import { currentAuthStatus, currentUser } from "./stores";
import { get } from "svelte/store";

export const isAuthed = async () => {
  //instead of checking the current store, we would want to check with auth0
  const authed = get(currentAuthStatus);
  return new Promise((resolve) => {
    if (authed) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

export const getUser = async () => {
  const user = { name: "John Doe", id: 1 };
  const authed = await isAuthed();
  return new Promise((resolve) => {
    if (authed) {
      resolve(user);
    } else {
      resolve(null);
    }
  });
};

export const logout = async () => {
  currentAuthStatus.set(false);
  currentUser.set(null);
  return new Promise((resolve) => {
    resolve(true);
  });
};

export const login = async () => {
  currentAuthStatus.set(true);
  const user = await getUser();
  currentUser.set(user);
  return new Promise((resolve) => {
    resolve(true);
  });
};

export const initializeAuth = async () => {};
