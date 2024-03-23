import { writable } from "svelte/store";

export const currentAuth0Client = writable();
export const currentAuthStatus = writable(false);
export const currentUser = writable(null);
