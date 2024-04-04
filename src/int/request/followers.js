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
  const currentFollowers = await followersByUser(userId);
  const thisToken = await token();
  let newFollowers;
  if (action == "follow") {
    newFollowers = [...currentFollowers.followers, targetId];
  }
  if (action == "unfollow") {
    newFollowers = currentFollowers.followers.filter((i) => i != targetId);
  }
  const newRecord = {
    userId: userId,
    followers: newFollowers,
  };
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
  if (!res.ok) throw new Error(res.statusText);
  try {
    const data = await res.json();
    return newRecord.followers;
  } catch (e) {
    return newRecord.followers;
  }
};
