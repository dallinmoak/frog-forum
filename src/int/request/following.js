import { token } from "./main";
import { updateFollowers } from "./followers";

export const followingByUser = async (userId) => {
  const thisToken = await token();
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/following/${userId}`,
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

export const intializeFollowing = async (userId) => {
  const thisToken = await token();
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/following`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${thisToken}`,
    },
    body: JSON.stringify({
      userId,
      following: [],
    }),
  });
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data;
};

export const updateFollowing = async (userId, targetId, action) => {
  console.log(
    `${targetId} is being ${
      action == "follow" ? "added to" : "removed from"
    } ${userId}'s following`
  );
  const currentFollowing = await followingByUser(userId);
  const thisToken = await token();
  let newFollowing;
  console.log("aciton: ", action);
  if (action == "follow") {
    console.log(`adding to array`);
    newFollowing = [...currentFollowing.following, targetId];
  }
  if (action == "unfollow") {
    newFollowing = currentFollowing.following.filter((i) => i != targetId);
  }
  const newRecord = {
    userId: userId,
    following: newFollowing,
  };
  console.log("newRecord: ", newRecord);
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/following/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${thisToken}`,
      },
      body: JSON.stringify(newRecord),
    }
  );
  console.log("updatefollowing res: ", res);
  if (!res.ok) throw new Error(res.statusText);
  try {
    const data = await res.json();
    console.log("updateFollowing data: ", data);
    return data;
  } catch (e) {
    console.log("couldn't return data: ", e);
    return true;
  }
};

export const follow = async (userId, targetId, action) => {
  console.log("follow request");
  const updatedFollowing = await updateFollowing(userId, targetId, action);
  const updatedFollowers = await updateFollowers(targetId, userId, action);
  return { updatedFollowing, updatedFollowers };
};
