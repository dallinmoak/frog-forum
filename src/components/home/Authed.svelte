<script>
  import PostList from "./PostList.svelte";
  import { currentUser } from "../../stores";
  document.title = "Frog Forum | Home Page";
</script>

<h1 class="bg-primary-light">Your Feed</h1>
<h3>Welcome, {$currentUser?.name}</h3>
<PostList authors={$currentUser.following} />
