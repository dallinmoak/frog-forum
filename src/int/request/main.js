import { get } from "svelte/store";
import { currentAuth0Client } from "../../stores";

export const token = async () => {
  const client = get(currentAuth0Client);
  const token = await client.getTokenSilently();
  return token;
};
