<script>
  export let postId;
  import { Link } from "svelte-routing";
  import { postById, userById } from "../../int/request";
</script>

{#await postById(postId)}
  <p>Fetching post...</p>
{:then post}
  <div>
    <p>
      <span class="italic">{post.caption ? post.caption : "Untitled"}</span>
      by&nbsp;
      {#await userById(post.author)}
        Fetching author...
      {:then author}
        <Link to={`profile/${author.id}`}>{author.name}</Link>
      {:catch e}
        <p>{JSON.stringify(e)}</p>
      {/await}
    </p>
    <img src={post.pic} alt={post.caption} />
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
