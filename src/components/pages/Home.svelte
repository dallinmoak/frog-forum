<script>
  import PostList from "../PostList.svelte";
  import { currentUser } from "../../stores";
  document.title= "Home Page"

  const getFollowers = (id) => {
    // fetch followers data from the server
    return [2, 3];
  };
</script>
<title>Home/Feed</title>
<h1>Home/feed page</h1>
<p>Welcome {$currentUser?.name}</p>
<PostList authors={getFollowers($currentUser?.id)} />
