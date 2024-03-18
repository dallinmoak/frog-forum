<script>
  import PostList from "../PostList.svelte";

  export let currentUserId;

  const getUserName = (id) => {
    // fetch user data from the server
    return "John Doe";
  };

  const getFollowers = (id) => {
    // fetch followers data from the server
    return [2, 3];
  };
</script>

<h1>Home/feed page</h1>
<p>Welcome {getUserName(currentUserId)}</p>
<PostList authors={getFollowers(currentUserId)} />
