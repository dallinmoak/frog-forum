import { token } from "./main";

export const userByAuth0Id = async (auth0Id) => {
  const thisToken = await token();
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/users/auth0/${auth0Id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${thisToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data;
};
