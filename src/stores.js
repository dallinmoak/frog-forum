import { writable } from "svelte/store";

export const currentAuth0Client = writable();
export const currentAuthStatus = writable(false);
export const currentUser = writable(null);
export const registrationData = writable(null);
export const newRegistrationSuccessful = writable(null);

export const currentProfilePage = writable(null);
