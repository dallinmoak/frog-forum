<script>
  import { currentUser } from "../../stores";
  import { followingByUser } from "../../int/request/following";
  import { allUsers } from "../../int/request/users";
  import PostList from "./PostList.svelte";
  import UserCard from "../ui/UserCard.svelte";
  import PageHeading from "../ui/PageHeading.svelte";
  import { onMount } from "svelte";
  document.title = "Frog Forum | Home Page";
</script>

<PageHeading>Your Feed</PageHeading>
<h3 class="text-center">Welcome, {$currentUser?.firstName}</h3>
{#await followingByUser($currentUser._id)}
  <p>Fetching following...</p>
{:then following}
  {#if following.following.length === 0}
    <p class="text-center">You're not following anyone yet.</p>
    {#await allUsers()}
      <p>Fetching users...</p>
    {:then users}
      <div class="flex flex-col gap-1">
        {#each users as user}
          <UserCard {user} variant="large" />
        {/each}
      </div>
    {:catch e}
      <p>{e}</p>
    {/await}
  {:else}
    <PostList authors={following.following} />
  {/if}
{:catch e}
  <p>{e}</p>
{/await}
