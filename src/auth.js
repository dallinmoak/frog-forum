import { currentAuthStatus, currentUser } from "./stores";

export const isAuthed = async () => {
  return new Promise((resolve) => {
    if (localStorage.getItem("isAuthed") == "true") {
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
  localStorage.setItem("isAuthed", "false");
  currentAuthStatus.set(false);
  currentUser.set(null);
  return new Promise((resolve) => {
    resolve(true);
  });
};

export const login = async () => {
  localStorage.setItem("isAuthed", "true");
  currentAuthStatus.set(true);
  const user = await getUser();
  currentUser.set(user);
  return new Promise((resolve) => {
    resolve(true);
  });
};

export const initializeAuth = async () => {
  //create auth localstorage if not present
  if (localStorage.getItem("isAuthed") == null) {
    localStorage.setItem("isAuthed", "false");
  }
  //sycronzise auth store with auth local store
  if (localStorage.getItem("isAuthed") == "true") {
    currentAuthStatus.set(true);
    const user = await getUser();
    currentUser.set(user);
  } else {
    currentAuthStatus.set(false);
    currentUser.set(null);
  }
};
