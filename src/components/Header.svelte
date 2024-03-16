<script>
  import { Link } from "svelte-routing";

  export let currentUserId = 1;
</script>

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
