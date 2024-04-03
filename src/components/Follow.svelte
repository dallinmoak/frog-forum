<script>
  import { userById } from "../int/request/users";
  import UserCard from "./ui/UserCard.svelte";
  export let users;
  export let label;
</script>

<h1>{label}</h1>
{#each users as userId}
  {#await userById(userId)}
    <p>loading user...</p>
  {:then user}
    <UserCard {user} />
  {:catch e}
    <p>{e}</p>
  {/await}
{/each}
