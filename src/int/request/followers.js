import { token } from "./main";

export const followersByUser = async (userId) => {
  const thisToken = await token();
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/followers/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${thisToken}`,
      },
    }
  );
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data;
};

export const intializeFollowers = async (userId) => {
  const thisToken = await token();
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/followers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${thisToken}`,
    },
    body: JSON.stringify({
      userId,
      followers: [],
    }),
  });
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data;
};

export const updateFollowers = async (userId, targetId, action) => {
  console.log(
    `${targetId} is being ${
      action == "follow" ? "added to" : "removed from"
    } ${userId}'s followers`
  );
  const currentFollowers = await followersByUser(userId);
  const thisToken = await token();
  let newFollowers;
  console.log("aciton: ", action);
  if (action == "follow") {
    console.log(`adding to array`);
    newFollowers = [...currentFollowers.followers, targetId];
  }
  if (action == "unfollow") {
    newFollowers = currentFollowers.followers.filter((i) => i != targetId);
  }
  const newRecord = {
    userId: userId,
    followers: newFollowers,
  };
  console.log("newRecord: ", newRecord);
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/followers/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${thisToken}`,
      },
      body: JSON.stringify(newRecord),
    }
  );
  console.log("updateFollowers res: ", res);
  if (!res.ok) throw new Error(res.statusText);
  try {
    const data = await res.json();
    console.log("updateFollowers data: ", data);
    return data;
  } catch (e) {
    console.log("couldn't read  data", e);
    return true;
  }
};
