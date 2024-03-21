<script>
  import { Router, Route, Link } from "svelte-routing";
  import Header from "./components/Header.svelte";
  import Login from "./components/pages/Login.svelte";
  import Home from "./components/pages/Home.svelte";
  import Profile from "./components/pages/Profile.svelte";

  let currentUserId = 1;
</script>

<main>
  <Router>
    <Header {currentUserId} />
    <Route path="/">
      <Home currentUserId />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/profile/:userId" let:params>
      <Profile userId={params.userId} />
    </Route>
  </Router>
</main>
