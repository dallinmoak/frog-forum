<script>
  import UserCard from "./ui/UserCard.svelte";

  export let userData;
  document.title = `Frog Forum |  ${userData.fName}'s Profile`;
</script>

<UserCard user={userData} variant="page" />
