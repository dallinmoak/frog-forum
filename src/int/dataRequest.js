import { get } from "svelte/store";
import { createClient } from "../auth";
import { currentAuth0Client, currentUser } from "../stores";

export const token = async () => {
  let client = get(currentAuth0Client);
  if (!client) {
    const newClient = await createClient();
    currentAuth0Client.set(newClient);
    client = newClient;
  }
  const token = await client.getTokenSilently();
  return token;
};

export class DataRequest {
  constructor(options) {
    this.options = options;
  }
  async send(criteria) {
    const thisToken = await token();
    if (thisToken) {
      const entity = entities[this.options.entity];
      const func = entity[this.options.func];
      return await func(thisToken, criteria);
    } else {
      console.log(
        `no token for ${this.options.entity}.${this.options.func} with criteria ${criteria}`
      );
    }
  }
}

const standardFetch = async (path, method, token, body = null) => {
  const url = `${import.meta.env.VITE_SERVER_URL}/${path}`;
  const options = {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  };
  // console.log("url", url);
  // console.log("options", options);
  try {
    const res = await fetch(url, options);
    // console.log("res", res);
    try {
      const data = await res.json();
      // console.log(data);
      return data;
    } catch (e) {
      console.error(e);
      return e;
    }
  } catch (e) {
    console.error(e);
    return e;
  }
};

const followshipGetByUser = async (token, userId) => {
  const ersRes = await standardFetch(`followers/${userId}`, "GET", token);
  const ingRes = await standardFetch(`following/${userId}`, "GET", token);
  return { followers: ersRes.followers, following: ingRes.following };
};

const entities = {
  user: {
    getById: async (token, id) => {
      return await standardFetch(`users/${id}`, "GET", token);
    },
    getByAuth0Id: async (token, auth0Id) => {
      return await standardFetch(`users/auth0/${auth0Id}`, "GET", token);
    },
    create: async (token, newUser) => {
      const user = await standardFetch("users", "POST", token, newUser);
      const { insertedId } = user;
      const createFollowship = async (targetId) => {
        await standardFetch("following", "POST", token, {
          userId: targetId,
          following: [],
        });
        await standardFetch("followers", "POST", token, {
          userId: targetId,
          followers: [],
        });
      };
      await createFollowship(insertedId);
      return { ...user, following: [], followers: [] };
    },
  },
  users: {
    getAll: async (token) => {
      return await standardFetch("users", "get", token);
    },
  },
  posts: {
    getByAuthors: async (token, authors) => {
      if (authors.length > 0) {
        const authorList = authors.join(",");
        return await standardFetch(`posts/${authorList}`, "GET", token);
      } else return [];
    },
  },
  post: {
    getById: async (token, id) => {
      const postData = await standardFetch(`posts/by-id/${id}`, "GET", token);
      return postData;
    },
    create: async (token, body) => {
      return await standardFetch(`posts`, "POST", token, body);
    },
  },
  followship: {
    getByUser: followshipGetByUser,
    updateByUser: async (token, { userId, targetId, action }) => {
      const { following } = await followshipGetByUser(token, userId);
      const { followers } = await followshipGetByUser(token, targetId);
      let [nFollowing, nFollowers] = [following, followers];
      if (action == "follow") {
        nFollowing = [...nFollowing, targetId];
        nFollowers = [...nFollowers, userId];
      } else if (action == "unfollow") {
        nFollowing = nFollowing.filter((i) => i != targetId);
        nFollowers = nFollowers.filter((i) => i != userId);
      }
      await standardFetch(`following/${userId}`, "PUT", token, {
        userId,
        following: nFollowing,
      });
      await standardFetch(`followers/${targetId}`, "PUT", token, {
        userId: targetId,
        followers: nFollowers,
      });
      currentUser.update((oldUser) => {
        return {
          ...oldUser,
          following: nFollowing,
        };
      });
    },
  },
};
