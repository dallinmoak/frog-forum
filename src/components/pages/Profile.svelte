<script>
  import { userById } from "../../int/request";
  import { currentUser, currentAuthStatus } from "../../stores";

  export let userId;
  // check if the user is the current user
  import ProfileData from "../ProfileData.svelte";
  $: isCurrentUser = $currentUser?._id == userId;
  $: userDataPromise = userById(userId);
</script>

{#if $currentAuthStatus}
  {#if isCurrentUser}
    <h1>Your profile page</h1>
  {:else}
    <h1>someone else's profile page</h1>
  {/if}
  {#await userDataPromise}
    <p>Fetching user data...</p>
  {:then userData}
    <ProfileData {userData} />
  {:catch e}
    <p>{JSON.stringify(e)}</p>
  {/await}
{:else}
  <h1>Profile Page</h1>
  <p>Not authenticated</p>
{/if}
