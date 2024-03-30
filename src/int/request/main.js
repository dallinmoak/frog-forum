import { get } from "svelte/store";
import { currentAuth0Client } from "../../stores";

export const token = async () => {
  const token = await get(currentAuth0Client).getTokenSilently();
  return token;
};
