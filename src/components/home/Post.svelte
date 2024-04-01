<script>
  export let postId;
  import { Link } from "svelte-routing";
  import { postById } from "../../int/request/posts";
  import { userById } from "../../int/request/users";
  import UserCard from "../ui/UserCard.svelte";
</script>

{#await postById(postId)}
  <p>Fetching post...</p>
{:then post}
  <div class="post">
    <p>
      <span class="italic">{post.caption ? post.caption : "Untitled"}</span>
      by&nbsp;
      {#await userById(post.author)}
        Fetching author...
      {:then author}
        <UserCard user={author} />
      {:catch e}
        <p>{JSON.stringify(e)}</p>
      {/await}
    </p>
    <img class="rounded-[10px]" src={post.pic} alt={post.caption} />
    <p>
      Posted
      <Link to={`/post/${post.postId}`}>
        {post.date.toLocaleString("en-us", { timeZone: "MST" })}
      </Link>
    </p>
  </div>
{:catch e}
  <p>{JSON.stringify(e)}</p>
{/await}

<style>
  .post {
    margin: 1em;
    padding: 1em;
    border: 3px solid var(--secondary-color);
    border-radius: 20px;
    background-color: var(--light-grey);
  }
</style>
