<script>
  import { currentUser } from "../../stores";
  import { DataRequest } from "../../int/dataRequest";
  import PostList from "./PostList.svelte";
  import UserCard from "../ui/UserCard.svelte";
  import PageHeading from "../ui/PageHeading.svelte";

  document.title = "Frog Forum | Home Page";
  const allUsers = new DataRequest({
    entity: "users",
    func: "getAll",
  });

  const followshipByUser = new DataRequest({
    entity: "followship",
    func: "getByUser",
  });
</script>

<PageHeading>Your Feed</PageHeading>
<h3 class="text-center">Welcome, {$currentUser?.firstName}</h3>
{#await followshipByUser.send($currentUser._id)}
  <p>Fetching following...</p>
{:then { following }}
  {#if following.length === 0}
    <p class="text-center">You're not following anyone yet.</p>
    {#await allUsers.send()}
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
    <PostList authors={following} />
  {/if}
{:catch e}
  <p>{e}</p>
{/await}
