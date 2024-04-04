<script>
  import UserCard from "./ui/UserCard.svelte";

  export let userData;
  document.title = `Frog Forum |  ${userData.fName}'s Profile`;
</script>

<UserCard user={userData} variant="default" />
<UserCard user={userData} variant="large" />
<UserCard user={userData} variant="page" />
