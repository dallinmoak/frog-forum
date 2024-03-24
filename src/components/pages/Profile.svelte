<script>
  export let userId;
  // check if the user is the current user
  import { currentUser } from "../../stores";
  $: isCurrentUser = $currentUser?.id == userId;
  // later, this will be set by a lookup
  let profileData = {
    id: userId,
    name: `Name of ${userId}`,
  };
  document.title = `Frog Forum |  ${profileData.name}'s Profile`;
</script>

{#if isCurrentUser}
  <h1>Your profile page</h1>
{:else}
  <h1>someone else's profile page</h1>
{/if}
<p>User ID: {userId}</p>
