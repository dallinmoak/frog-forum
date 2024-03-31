<script>
  import { userById } from "../int/request/users";
  export let users;
  export let label;
  export let firstName;
  export let lastName;
</script>

<h1>{label}</h1>
{#each users as userId}
  {#await userById(userId)}
    <p>loading users...</p>
  {:then user}
    <p>{JSON.stringify(firstName)} {JSON.stringify(lastName)}</p>
  {:catch e}
    <p>{JSON.stringify(e)}</p>
  {/await}
{/each}
