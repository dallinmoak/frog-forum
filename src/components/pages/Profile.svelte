<script>
  export let userId;
  // check if the user is the current user
  import { currentUser } from "../../stores";
  let isCurrentUser = $currentUser.id == userId;
</script>

{#if isCurrentUser}
  <h1>Your profile page</h1>
{/if}
<p>User ID: {userId}</p>
