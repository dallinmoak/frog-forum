<script>
  import PostList from "../PostList.svelte";
  import { currentUser } from "../../stores";

  const getFollowers = (id) => {
    // fetch followers data from the server
    return [2, 3];
  };
</script>

{#if $currentAuthStatus}
  <Authed />
{:else}
  <Unauthed />
{/if}
