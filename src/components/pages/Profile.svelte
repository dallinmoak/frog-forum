<script>
  export let userId;
  // check if the user is the current user
  const getCurrentUser = () => 1;
  let isCurrentUser = getCurrentUser() == userId;
</script>

{#if isCurrentUser}
  <h1>Your profile page</h1>
{/if}
<p>User ID: {userId}</p>
