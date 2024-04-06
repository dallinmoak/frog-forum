<script>
  export let postId;
  import { Link } from "svelte-routing";
  import { postById } from "../../int/request/posts";
  import { DataRequest } from "../../int/request/main";
  import { onMount } from "svelte";
  import UserCard from "../ui/UserCard.svelte";
  import PageHeading from "../ui/PageHeading.svelte";
  let successMsg = window.location.search.includes("success");
  let showSuccessMsg = false;
  onMount(() => {
    if (successMsg) {
      showSuccessMsg = true;
      setTimeout(() => {
        showSuccessMsg = false;
      }, 5000);
    }
  });
  const userById = new DataRequest({
    entity: "user",
    func: "getById",
  });
</script>

{#if showSuccessMsg}
  <p>Post successfully created!</p>
{/if}
{#await postById(postId)}
  <p>Fetching post...</p>
{:then post}
  <div class="flex flex-col items-center gap-2">
    <PageHeading>
      {post.caption ? post.caption : "Untitled Post"}
    </PageHeading>
    <p>
      {#await userById.send(post.authorId)}
        Fetching author...
      {:then author}
        <UserCard user={author} variant="large" />
      {:catch e}
        <p>{JSON.stringify(e)}</p>
      {/await}
    </p>
    <img class="rounded-[10px]" src={post.image} alt={post.caption} />
    <p>
      Posted
      {new Date(post.date).toLocaleString("en-us", { timeZone: "MST" })}
    </p>
  </div>
{:catch e}
  <p>{JSON.stringify(e)}</p>
{/await}
