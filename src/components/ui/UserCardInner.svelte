<script>
  import Button from "./Button.svelte";
  import { follow } from "../../int/request/following";
  import { currentUser } from "../../stores";
  export let variants;
  export let variant;
  export let user;

  $: isFollowing = $currentUser.following?.includes(user._id);
  $: isSelf = user._id === $currentUser._id;
  $: action = isFollowing ? "unfollow" : "follow";

  const handleFollow = () => {
    follow($currentUser._id, user._id, action);
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
    <Button on:click={handleFollow}>{action}</Button>
  {/if}
</div>
