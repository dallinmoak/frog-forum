<script>
  import { postListByAuthors } from "../../int/request/posts";
  import Post from "./Post.svelte";

  export let authors;
</script>

{#await postListByAuthors(authors)}
  <p>Fetching posts...</p>
{:then posts}
  <ul class="post-list">
    {#each posts as post}
      <!-- display author, image, ect here -->
      <Post postId={post.postId} />
    {/each}
  </ul>
{:catch e}
  <p>{JSON.stringify(e)}</p>
{/await}

<style>
  .post-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
</style>
