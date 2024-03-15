<script>
  import { Router, Route, Link } from "svelte-routing";

  let currentUserId = 1;
</script>

<main>
  <Router>
    <header>
      <h2>Frog Forum</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home/feed</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
          <li>
            <Link to="/profile/{currentUserId}">My Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
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
