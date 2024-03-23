<script>
  export let userId;
  // check if the user is the current user
  import { currentUser } from "../../stores";
  $: isCurrentUser = $currentUser?.id == userId;

document.title="Profile page"
</script>

{#if isCurrentUser}
  <h1>Your profile page</h1>
{:else}
  <h1>someone else's profile page</h1>
{/if}
<p>User ID: {userId}</p>
