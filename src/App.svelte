<script>
  import { Router, Route, Link } from "svelte-routing";
  import Header from "./components/Header.svelte";
  import Home from "./components/pages/Home.svelte";
  import Profile from "./components/pages/Profile.svelte";
  import NewPost from "./components/pages/NewPost.svelte";
  import { onMount } from "svelte";
  import { initializeAuth, createClient } from "./auth";
  import { currentAuth0Client } from "./stores";

  onMount(async () => {
    $currentAuth0Client = await createClient();
    initializeAuth($currentAuth0Client);
  });
</script>

<main>
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
  </Router>
</main>
