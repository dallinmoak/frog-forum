<script>
  import Button from "./Button.svelte";
  export let variants;
  export let variant;
  export let user;
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

  <div class={variants[variant].supplemental}>
    <p>{user.email}</p>
    <p>Birthday: {user.birthday}</p>
  </div>
</div>
<div class={variants[variant].follow}>
  <Button>follow</Button>
</div>
