import { token } from "./main";
import { updateFollowers } from "./followers";
import { currentProfilePage, currentUser } from "../../stores";
import { followersByUser } from "./followers";

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
  const currentFollowing = await followingByUser(userId);
  const thisToken = await token();
  let newFollowing;
  if (action == "follow") {
    newFollowing = [...currentFollowing.following, targetId];
  }
  if (action == "unfollow") {
    newFollowing = currentFollowing.following.filter((i) => i != targetId);
  }
  const newRecord = {
    userId: userId,
    following: newFollowing,
  };
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
  if (!res.ok) throw new Error(res.statusText);
  try {
    const data = await res.json();
    return newRecord.following;
  } catch (e) {
    return newRecord.following;
  }
};

export const follow = async (userId, targetId, action) => {
  const updatedFollowing = await updateFollowing(userId, targetId, action);
  await updateFollowers(targetId, userId, action);
  currentUser.update((oldUser) => {
    return {
      ...oldUser,
      following: updatedFollowing ? updatedFollowing : [],
    };
  });
  currentProfilePage.update((oldPage) => {
    return {
      ...oldPage,
      followingByUser,
      followersByUser,
    };
  });
};
