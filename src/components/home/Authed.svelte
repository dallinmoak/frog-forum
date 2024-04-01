<script>
  import PostList from "./PostList.svelte";
  import { currentUser } from "../../stores";
  import { followingByUser } from "../../int/request/following";
  import PageHeading from "../ui/PageHeading.svelte";
  document.title = "Frog Forum | Home Page";
</script>

<PageHeading>Your Feed</PageHeading>
<h3 class="text-center">Welcome, {$currentUser?.firstName}</h3>
{#await followingByUser($currentUser._id)}
  <p>Fetching following...</p>
{:then following}
  <PostList authors={following} />
{:catch e}
  <p>{JSON.stringify(e)}</p>
{/await}
