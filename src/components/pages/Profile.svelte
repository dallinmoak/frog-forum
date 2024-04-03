<script>
  import { onMount } from "svelte";
  import { userById } from "../../int/request/users";
  import {
    currentUser,
    currentAuthStatus,
    newRegistrationSuccessful,
  } from "../../stores";

  export let userId;
  // check if the user is the current user
  import ProfileData from "../ProfileData.svelte";
  import Follow from "../Follow.svelte";
  import PageHeading from "../ui/PageHeading.svelte";
  import { followingByUser } from "../../int/request/following";
  import { followersByUser } from "../../int/request/followers";
  $: isCurrentUser = $currentUser?._id == userId;
  onMount(() => {
    if ($newRegistrationSuccessful) {
      setTimeout(() => {
        $newRegistrationSuccessful = false;
      }, 500);
    }
  });
</script>

{#if $newRegistrationSuccessful}
  <p>Registration successful! welcome to frog forum</p>
{/if}
{#if $currentAuthStatus}
  {#if isCurrentUser}
    <PageHeading>Your Profile Page</PageHeading>
  {:else}
    <PageHeading>Someone Else's Profile</PageHeading>
  {/if}
  {#await userById(userId)}
    <p>Fetching user data...</p>
  {:then userData}
    <ProfileData {userData} />
    {#await followingByUser(userData._id)}
      <p>fetching...</p>
    {:then { following }}
      <Follow label="Following" users={following} />
    {:catch e}
      <p>{e}</p>
    {/await}
    {#await followersByUser(userData._id)}
      <p>fetching...</p>
    {:then { followers }}
      <Follow label="Followers" users={followers} />
    {:catch e}
      <p>{JSON.stringify(e)}</p>
    {/await}
  {:catch e}
    <p>{e}</p>
  {/await}
{:else}
  <PageHeading>Profile</PageHeading>
  <p>Not authenticated</p>
{/if}
