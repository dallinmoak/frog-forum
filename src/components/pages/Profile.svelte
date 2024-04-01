<script>
  import { onMount } from "svelte";
  import { userById } from "../../int/request/users";
  import {
    currentUser,
    currentAuthStatus,
    newRegistrationSuccessful,
  } from "../../stores";

  export let userId;
  // check if the user is the current user
  import ProfileData from "../ProfileData.svelte";
  import Follow from "../Follow.svelte";
  $: isCurrentUser = $currentUser?._id == userId;
  $: userDataPromise = userById(userId);
  onMount(() => {
    if ($newRegistrationSuccessful) {
      setTimeout(() => {
        $newRegistrationSuccessful = false;
      }, 500);
    }
  });
</script>

{#if $newRegistrationSuccessful}
  <p>Registration successful! welcome to frog forum</p>
{/if}
{#if $currentAuthStatus}
  {#if isCurrentUser}
    <h1 class="bg-primary-light">Your Profile Page</h1>
  {:else}
    <h1>someone else's profile page</h1>
  {/if}
  {#await userDataPromise}
    <p>Fetching user data...</p>
  {:then userData}
    <ProfileData {userData} />
    <Follow label="Following" users={["660743113622a1894e2b7d98"]} />
    <Follow label="Followers" users={["660743113622a1894e2b7d98"]} />
  {:catch e}
    <p>{JSON.stringify(e)}</p>
  {/await}
{:else}
  <h1>Profile Page</h1>
  <p>Not authenticated</p>
{/if}
