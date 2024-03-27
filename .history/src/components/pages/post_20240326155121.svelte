<script>
  import { getPostData, userById } from "../../int/request";

export let postId


let post;

const getPosts = async (id) => {
  post = await getPostData(id);
  post.authorName = await userById(post.author).name;
}




</script>



<h1>
  your post is id {postId}
</h1>