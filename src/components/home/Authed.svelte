<script>
  import PostList from "./PostList.svelte";
  import { currentUser } from "../../stores";
  import { followingByUser } from "../../int/request/following";
  document.title = "Frog Forum | Home Page";
</script>

<h1 class="bg-primary-light">Your Feed</h1>
<h3>Welcome, {$currentUser?.firstName}</h3>
{#await followingByUser($currentUser._id)}
  <p>Fetching following...</p>
{:then following}
  <PostList authors={following} />
{:catch e}
  <p>{JSON.stringify(e)}</p>
{/await}
