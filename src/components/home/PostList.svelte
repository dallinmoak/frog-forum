<script>
  import { postListByAuthors } from "../../int/request";
  import Post from "./Post.svelte";

  export let authors;
</script>

{#await postListByAuthors(authors)}
  <p>Fetching posts...</p>
{:then posts}
  <ul>
    {#each posts as post}
      <!-- display author, image, ect here -->
      <Post postId={post.postId} />
    {/each}
  </ul>
{:catch e}
  <p>{JSON.stringify(e)}</p>
{/await}
