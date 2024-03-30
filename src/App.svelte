<script>
  import { Router, Route } from "svelte-routing";
  import Header from "./components/Header.svelte";
  import Home from "./components/pages/Home.svelte";
  import Profile from "./components/pages/Profile.svelte";
  import NewPost from "./components/pages/NewPost.svelte";
  import { onMount } from "svelte";
  import { initializeAuth, createClient } from "./auth";
  import { currentAuth0Client } from "./stores";
  import Post from "./components/pages/Post.svelte";
  import Registration from "./components/pages/Registration.svelte";
  onMount(async () => {
    if (!$currentAuth0Client) {
      $currentAuth0Client = await createClient();
    }
    initializeAuth($currentAuth0Client);
  });
</script>

<main>
  <!-- {"currentAuth0Client: " + JSON.stringify($currentAuth0Client)} -->
  <!-- {"currentAuthStatus: " + JSON.stringify($currentAuthStatus)} -->
  <!-- {"currentAuthStatus: " + JSON.stringify($currentUser)} -->
  <Router>
    <Header />
    <Route path="/">
      <Home />
    </Route>
    <Route path="/profile/:userId" let:params>
      <Profile userId={params.userId} />
    </Route>
    <Route path="/new-post">
      <NewPost />
    </Route>
    <Route path="/post/:postId" let:params>
      <Post postId={params.postId} />
    </Route>
    <Route path="/registration">
      <Registration />
    </Route>
    <Route path="*">
      <h3>
        404: route <span class="font-mono bg-slate-200 rounded-md px-1"
          >{window.location}</span
        > Not Found
      </h3>
    </Route>
  </Router>
</main>
