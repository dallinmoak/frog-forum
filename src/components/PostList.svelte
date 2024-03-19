<script>
  export let authors;

  const getPosts = async (authors) => {
    // generate list of posts by authors
    return [{ postId: 1 }, { postId: 2 }];
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
