<script>
  import { postListByAuthors } from "../../int/request/posts";
  import Post from "./Post.svelte";

  export let authors;
</script>

{#await postListByAuthors(authors)}
  <p>Fetching posts...</p>
{:then posts}
  {#if posts.length === 0}
    <p>
      None of the people you follow have made any posts. Try following some more
      folks.
    </p>
  {/if}
  <ul class="post-list">
    {#each posts as post}
      <Post {post} />
    {/each}
  </ul>
{:catch e}
  <p>{e}</p>
{/await}

<style>
  .post-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
</style>
