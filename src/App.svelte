<script>
  import { Router, Route, Link } from "svelte-routing";
  import Header from "./components/Header.svelte";

  let currentUserId = 1;
</script>

<main>
  <Router>
    <Header {currentUserId} />
    <Route path="/">
      <h1>Home/feed page</h1>
    </Route>
    <Route path="/signup">
      <h1>Sign up page</h1>
    </Route>
    <Route path="/signin">
      <h1>Sign in page</h1>
    </Route>
    <Route path="/profile/:userId" let:params>
      <h1>User profile page</h1>
      <p>User ID: {params.userId}</p>
    </Route>
  </Router>
</main>
