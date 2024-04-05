<script>
  import UserCard from "./ui/UserCard.svelte";

  export let userData;
  document.title = `Frog Forum |  ${userData.firstName}'s Profile`;
</script>

<!-- <div class="flex flex-col gap-1"> -->
<!-- <UserCard user={userData} variant="default" /> -->
<!-- <UserCard user={userData} variant="large" /> -->
<UserCard user={userData} variant="page" />
<!-- </div> -->
