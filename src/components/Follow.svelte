<script>
  import { DataRequest } from "../int/dataRequest";
  import UserCard from "./ui/UserCard.svelte";
  export let users;
  export let label;

  const userById = new DataRequest({
    entity: "user",
    func: "getById",
  });
</script>

<h1>{label} ({users.length})</h1>
<div class="flex flex-col flex-wrap gap-2">
  {#each users as userId}
    {#await userById.send(userId)}
      <p>loading user...</p>
    {:then user}
      <UserCard {user} />
    {:catch e}
      <p>{e}</p>
    {/await}
  {/each}
</div>
