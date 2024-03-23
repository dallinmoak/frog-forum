import { createAuth0Client } from "@auth0/auth0-spa-js";
import { currentAuth0Client, currentAuthStatus, currentUser } from "./stores";
import { get } from "svelte/store";

export const createClient = async () => {
  const myClient = await createAuth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    cacheLocation: "localstorage",
    authorizationParams: {
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  });
  return myClient;
};

export const getUser = async () => {
  const client = get(currentAuth0Client);
  const Auth0user = await client.getUser();
  // get additional user data from the backend server's db
  const user = {
    name: Auth0user.nickname,
    email: Auth0user.email,
    picture: Auth0user.picture,
    auth0Id: Auth0user.sub,
    id: 1,
  };
  return user;
};

export const logout = async () => {
  const client = get(currentAuth0Client);
  await client.logout();
  currentAuthStatus.set(false);
  currentUser.set(null);
  currentAuth0Client.set(null);
  return true;
};

export const login = async () => {
  const client = get(currentAuth0Client);
  await client.loginWithPopup();
  const user = await getUser();
  currentUser.set(user);
  const isAuthed = await client.isAuthenticated();
  console.log("isAuthed", isAuthed);
  if (isAuthed) {
    currentAuthStatus.set(true);
    return user;
  } else return false;
};

export const initializeAuth = async (client) => {
  const auth0Status = await client.isAuthenticated();
  if (!auth0Status) {
    currentAuthStatus.set(false);
    currentUser.set(null);
  }
};
