<script>
  import Button from "./Button.svelte";
  import { follow } from "../../int/request/following";
  import { currentUser } from "../../stores";
  export let variants;
  export let variant;
  export let user;

  $: isFollowing = user.following?.includes($currentUser._id);
  $: isSelf = user._id === $currentUser._id;

  const handleFollow = () => {
    console.log("clicked follow");
    follow($currentUser._id, user._id, "follow");
  };
</script>

<div class="[&>img]:rounded-[50%]">
  <img
    class={variants[variant].img}
    src={user.profilePicUrl}
    alt={`${user.firstName} ${user.lastName}'s profile pic`}
  />
</div>
<div>
  <p class={variants[variant].name}>{user.firstName} {user.lastName}</p>
  <!-- <p>{user._id}</p> -->
  <div class={variants[variant].supplemental}>
    <p>{user.email}</p>
    <p>Birthday: {user.birthday}</p>
  </div>
</div>
<div class={variants[variant].follow}>
  {#if !isSelf}
    {#if isFollowing}
      <p>already following</p>
    {:else}
      <Button on:click={handleFollow}>follow</Button>
    {/if}
  {/if}
</div>
