import { createAuth0Client } from "@auth0/auth0-spa-js";
import {
  currentAuth0Client,
  currentAuthStatus,
  currentUser,
  registrationData,
} from "./stores";
import { get } from "svelte/store";
import { userByAuth0Id } from "./int/request/users";
import { navigate } from "svelte-routing";

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
  const user = await userByAuth0Id(Auth0user.sub);
  if (!user) {
    console.log("user not found; starting registration");
    registrationData.set(Auth0user);
    navigate("/registration");
    return null;
  }
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
  if (isAuthed) {
    currentAuthStatus.set(true);
    return user;
  } else return false;
};

export const initializeAuth = async (client) => {
  const auth0Status = await client.isAuthenticated();
  if (!auth0Status) {
    currentUser.set(null);
  } else {
    const user = await getUser();
    currentUser.set(user);
  }
  currentAuthStatus.set(auth0Status);
};
