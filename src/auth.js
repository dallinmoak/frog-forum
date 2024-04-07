import { createAuth0Client } from "@auth0/auth0-spa-js";
import {
  currentAuth0Client,
  currentAuthStatus,
  currentUser,
  registrationData,
} from "./stores";
import { get } from "svelte/store";
import { DataRequest } from "./int/dataRequest";
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
  const userByAuth0Id = new DataRequest({
    entity: "user",
    func: "getByAuth0Id",
  });
  const user = await userByAuth0Id.send(Auth0user.sub);
  if (!user) {
    console.log("user not found; starting registration");
    console.log("auth0 user", Auth0user);
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
  const client = await createClient();
  currentAuth0Client.set(client);
  await client.loginWithPopup();
  const user = await getUser();
  const followshipByUser = new DataRequest({
    entity: "followship",
    func: "getByUser",
  });
  const followship = await followshipByUser.send(user._id);
  console.log("testfollowship", followship);
  currentUser.set({
    ...user,
    ...followship,
  });
  const isAuthed = await client.isAuthenticated();
  if (isAuthed) {
    currentAuthStatus.set(true);
    return user;
  } else return false;
};

export const initializeAuth = async (client) => {
  if (client) {
    const auth0Status = await client.isAuthenticated();
    if (!auth0Status) {
      currentUser.set(null);
    } else {
      const user = await getUser();
      const followshipByUser = new DataRequest({
        entity: "followship",
        func: "getByUser",
      });
      const followship = await followshipByUser.send(user._id);
      currentUser.set({
        ...user,
        ...followship,
      });
    }
    currentAuthStatus.set(auth0Status);
  }
};
