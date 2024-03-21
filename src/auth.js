import { currentAuthStatus, currentUser } from "./stores";
import { get } from "svelte/store";

export const getUser = async () => {
  const user = { name: "John Doe", id: 1 };
  const authed = get(currentAuthStatus);
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

export const initializeAuth = async () => {
  //this should check on auth0, not our store
  const auth0Status = get(currentAuthStatus);
  if (!auth0Status) {
    currentAuthStatus.set(false);
    currentUser.set(null);
  }
};
