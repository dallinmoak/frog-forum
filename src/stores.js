import { writable } from "svelte/store";

export const currentAuthStatus = writable(false);
export const currentUser = writable(null);
