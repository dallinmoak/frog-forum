<script>
  import { onMount } from "svelte";
  import { userById } from "../../int/request/users";
  import { followingByUser } from "../../int/request/following";
  import { followersByUser } from "../../int/request/followers";
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
  import { postListByAuthors } from "../../int/request/posts";

  export let userId;
  // check if the user is the current user
  $: isCurrentUser = $currentUser?._id == userId;
  onMount(() => {
    if ($newRegistrationSuccessful) {
      setTimeout(() => {
        $newRegistrationSuccessful = false;
      }, 500);
    }
    $currentProfilePage = { userById, followersByUser, followingByUser };
  });
</script>

{#if $newRegistrationSuccessful}
  <p>Registration successful! welcome to frog forum</p>
{/if}
{#if $currentAuthStatus}
  {#if isCurrentUser}
    <PageHeading>Your Profile Page</PageHeading>
    <ProfileData userData={$currentUser} />
    <Follow label="Following" users={$currentUser.following} />
    <Follow label="Followers" users={$currentUser.followers} />
    <h1>Current posts</h1>
    {#await postListByAuthors([userId])}
      <p>Fetching posts.... </p>
    {:then currentPosts }
    <ul class="post-list">
      {#each currentPosts as post}
        <Post {post}/> 
      {/each}
      </ul>
    {:catch e}
    <p>{e}</p>
    {/await}
      


  {:else}
    <PageHeading>Someone Else's Profile</PageHeading>
    {#if $currentProfilePage.userById && $currentProfilePage.followingByUser && $currentProfilePage.followersByUser}
      {#await $currentProfilePage.userById(userId)}
        <p>Fetching user data...</p>
      {:then userData}
        <ProfileData {userData} />
        {#await $currentProfilePage.followingByUser(userData._id)}
          <p>fetching...</p>
        {:then { following }}
          <Follow label="Following" users={following} />
        {:catch e}
          <p>{e}</p>
        {/await}
        {#await $currentProfilePage.followersByUser(userData._id)}
          <p>fetching...</p>
        {:then { followers }}
          <Follow label="Followers" users={followers} />
        {:catch e}
          <p>{JSON.stringify(e)}</p>
        {/await}
      {:catch e}
        <p>{e}</p>
      {/await}
      <h1>Current posts</h1>
      {#await postListByAuthors([userId])}
        <p>Fetching posts.... </p>
      {:then currentPosts }
      <ul class="post-list">
        {#each currentPosts as post}
          <Post {post}/> 
        {/each}
        </ul>
      {:catch e}
      <p>{e}</p>
      {/await}
    {/if}
  {/if}
{:else}
  <PageHeading>Profile</PageHeading>
  <p>Not authenticated</p>
{/if}
