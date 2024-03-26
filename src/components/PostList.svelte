<script>
  import { postListByAuthors } from "../int/request";

  export let authors;

  const getPosts = async (authors) => {
    const posts = await postListByAuthors(authors);
    return posts;
  };
</script>

{#await getPosts(authors)}
  <p>Fetching posts...</p>
{:then posts}
  <ul>
    {#each posts as post}
      <!-- display author, image, ect here -->
      <li>Post ID: {post.postId}</li>
    {/each}
  </ul>
{:catch e}
  <p>{JSON.stringify(e)}</p>
{/await}
