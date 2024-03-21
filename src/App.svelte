<script>
  import { Router, Route, Link } from "svelte-routing";
  import Header from "./components/Header.svelte";
  import Home from "./components/pages/Home.svelte";
  import Profile from "./components/pages/Profile.svelte";
  import { onMount } from "svelte";
  import { initializeAuth } from "./auth";
  import { currentAuthStatus, currentUser } from "./stores";
  onMount(() => initializeAuth());
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
  </Router>
</main>
