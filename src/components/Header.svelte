<script>
  import { Link } from "svelte-routing";
  import { login, logout } from "../auth";
  import { currentAuthStatus, currentUser } from "../stores";
</script>

<header class="bg-primary">
  <h2 class="logo">Frog Forum</h2>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {#if $currentAuthStatus}
        <li>
          <Link to="/profile/{$currentUser?.id}">My Profile</Link>
        </li>
        <li>
          <Link to="/new-post">New Post</Link>
        </li>
      {/if}
    </ul>
  </nav>
  {#if $currentAuthStatus}
    <p>Logged in as {$currentUser?.name}</p>
    <button on:click={logout}>Logout</button>
  {:else}
    <button on:click={login}>login</button>
  {/if}
</header>
