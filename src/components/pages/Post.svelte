<script>
  export let postId;
  import { Link } from "svelte-routing";
  import { postById, userById } from "../../int/request";
  import { onMount } from "svelte";
  let successMsg = window.location.search.includes("success");
  let showSuccessMsg = false;
  onMount(() => {
    if (successMsg) {
      showSuccessMsg = true;
      setTimeout(() => {
        showSuccessMsg = false;
        console.log("hiding success msg");
      }, 5000);
    }
  });
</script>

{#if showSuccessMsg}
  <p>Post successfully created!</p>
{/if}
{#await postById(postId)}
  <p>Fetching post...</p>
{:then post}
  <div>
    <h1>
      {post.caption ? post.caption : "Untitled Post"}
    </h1>
    <h3>
      {#await userById(post.author)}
        Fetching author...
      {:then author}
        <Link to={`profile/${author._id}`}
          >{`${author.firstName} ${author.lastName}`}</Link
        >
      {:catch e}
        <p>{JSON.stringify(e)}</p>
      {/await}
    </h3>
    <img src={post.pic} alt={post.caption} />
    <p>
      Posted
      {post.date.toLocaleString("en-us", { timeZone: "MST" })}
    </p>
  </div>
{:catch e}
  <p>{JSON.stringify(e)}</p>
{/await}
