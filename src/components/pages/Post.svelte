<script>
  import { getPostData, userById } from "../../int/request";
  import {onMount} from "svelte";
  export let postId;

  let post;

  const getPosts = async (id) => {
    post = await getPostData(id);
    post.authorName = (await userById(post.author)).name;
  };
  onMount(getPosts)

</script>

{#if post}
  <h1>
    your post is id {postId}
    <img src={post.pic} alt={post.caption} />
    <p>{post.caption}</p>
    <p>{post.authorName}</p>
  </h1>
{/if}

