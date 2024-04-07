<script>
  import { onMount } from "svelte";
  import { DataRequest } from "../../int/dataRequest";
  import {
    currentUser,
    currentAuthStatus,
    newRegistrationSuccessful,
    currentProfilePage,
  } from "../../stores";
  import ProfileData from "../ProfileData.svelte";
  import Follow from "../Follow.svelte";
  import PageHeading from "../ui/PageHeading.svelte";
  import Post from "../home/Post.svelte";

  export let userId;
  // check if the user is the current user
  $: isCurrentUser = $currentUser?._id == userId;
  const userById = new DataRequest({
    entity: "user",
    func: "getById",
  });

  const followshipByUser = new DataRequest({
    entity: "followship",
    func: "getByUser",
  });

  const postListByAuthors = new DataRequest({
    entity: "posts",
    func: "getByAuthors",
  });

  onMount(() => {
    if ($newRegistrationSuccessful) {
      setTimeout(() => {
        $newRegistrationSuccessful = false;
      }, 500);
    }
    $currentProfilePage = { userById, followshipByUser };
  });
</script>

{#if $newRegistrationSuccessful}
  <p>Registration successful! welcome to frog forum</p>
{/if}
{#if $currentAuthStatus}
  {#if isCurrentUser}
    <PageHeading>Your Profile Page</PageHeading>
    <ProfileData userData={$currentUser} />
    <div class="flex flex-row justify-around gap-3">
      <Follow label="Following" users={$currentUser.following} />
      <Follow label="Followers" users={$currentUser.followers} />
    </div>
    <h1>My posts</h1>
    {#await postListByAuthors.send([userId])}
      <p>Fetching posts....</p>
    {:then currentPosts}
      <ul class="post-list">
        {#each currentPosts as post}
          <Post {post} />
        {/each}
      </ul>
    {:catch e}
      <p>{e}</p>
    {/await}
  {:else}
    <PageHeading>Someone Else's Profile</PageHeading>
    {#if $currentProfilePage?.userById && $currentProfilePage?.followshipByUser}
      {#await $currentProfilePage.userById.send(userId)}
        <p>Fetching user data...</p>
      {:then userData}
        <ProfileData {userData} />
        <div class="flex flex-row justify-around gap-3">
          {#await $currentProfilePage.followshipByUser.send(userData._id)}
            <p>fetching...</p>
          {:then { following }}
            <Follow label="Following" users={following} />
          {:catch e}
            <p>{e}</p>
          {/await}
          {#await $currentProfilePage.followshipByUser.send(userData._id)}
            <p>fetching...</p>
          {:then { followers }}
            <Follow label="Followers" users={followers} />
          {:catch e}
            <p>{JSON.stringify(e)}</p>
          {/await}
        </div>
        <h1>{userData.firstName}'s posts</h1>
        {#await postListByAuthors.send([userId])}
          <p>Fetching posts....</p>
        {:then currentPosts}
          <ul class="post-list">
            {#each currentPosts as post}
              <Post {post} />
            {/each}
          </ul>
        {:catch e}
          <p>{e}</p>
        {/await}
      {:catch e}
        <p>{e}</p>
      {/await}
    {/if}
  {/if}
{:else}
  <PageHeading>Profile</PageHeading>
  <p>Not authenticated</p>
{/if}
