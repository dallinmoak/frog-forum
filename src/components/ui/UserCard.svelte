<script>
  import { Link } from "svelte-routing";
  import Button from "./Button.svelte";
  import UserCardInner from "./UserCardInner.svelte";
  import { follow } from "../../int/request/following";
  import { currentUser } from "../../stores";

  export let user;
  export let variant = "default";

  $: isFollowing = $currentUser.following?.includes(user._id);
  $: isSelf = user._id === $currentUser._id;
  $: action = isFollowing ? "unfollow" : "follow";

  const handleFollow = () => {
    follow($currentUser._id, user._id, action);
  };
</script>

<div
  class={`gap-2 w-full bg-primary-light hover:bg-primary transition-colors flex flex-row flex-wrap items-center rounded-md no-underline card ${variant}`}
>
  <Link
    to={`/profile/${user._id}`}
    class="no-underline flex flex-row items-center gap-1 flex-wrap sm:flex-nowrap grow p-[0.75em]"
  >
    <div class="min-w-[fit-content]">
      <img
        class={`object-cover rounded-[50%] ${variant}`}
        src={user.profilePicUrl}
        alt={`${user.firstName} ${user.lastName}'s profile pic`}
      />
    </div>
    <div>
      <p class={`name ${variant}`}>{user.firstName} {user.lastName}</p>
      <!-- <p>{user._id}</p> -->
      <div class={`supplemental ${variant}`}>
        <p>{user.email}</p>
        <p>Birthday: {user.birthday}</p>
      </div>
    </div>
  </Link>
  <div class={`p-[0.75em] button ${variant}`}>
    {#if !isSelf && variant !== "default"}
      <Button on:click={handleFollow}>{action}</Button>
    {/if}
  </div>
</div>

<style>
  /* .card.default {
    flex-shrink: 2;
  } */

  img.default {
    width: 2rem;
    height: 2rem;
  }
  img.large {
    width: 5rem;
    height: 5rem;
  }
  img.page {
    width: 12rem;
    height: 12rem;
  }

  .supplemental.default {
    display: none;
  }

  .name.default {
    font-size: 1rem;
  }
  .name.large {
    font-size: 2.2rem;
  }
  .name.page {
    font-size: 4rem;
  }

  .button.default {
    display: none;
  }
  .button.page {
    font-size: 2em;
  }
</style>
