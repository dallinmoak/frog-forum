<script>
  import { Link } from "svelte-routing";
  import { login, logout } from "../auth";
  import { currentAuthStatus, currentUser } from "../stores";
  import Button from "./ui/Button.svelte";
  $: currentId = $currentUser?._id;
  const navItems = () => [
    { name: "Home", path: "/", authOnly: false },
    { name: "Profile", path: `/profile/${currentId}`, authOnly: true },
    { name: "New Post", path: "/new-post", authOnly: true },
  ];
</script>

<header
  class="bg-primary px-[2em] py-[1em] flex flex-wrap justify-between border-b-[3px] border-b-secondary m-0"
>
  <h2
    class="font-logo text-white m-[0.5em] font-bold text-shadow shadow-tertiary"
  >
    Frog Forum
  </h2>
  <nav>
    <ul class="flex">
      {#each navItems() as { name, path, authOnly }}
        {#if $currentAuthStatus || !authOnly}
          <li class="m-[1em]">
            <Link
              class="text-white hover:text-primary-dark  transition-colors duration-300 no-underline aria-current:underline"
              to={path}>{name}</Link
            >
          </li>
        {/if}
      {/each}
    </ul>
  </nav>
  {#if $currentAuthStatus}
    <p class="m-[1em] text-white">Logged in as {$currentUser?.email}</p>
    <div class="self-center">
      <Button on:click={logout}>Logout</Button>
    </div>
  {:else}
    <div class="self-center">
      <Button on:click={login}>login</Button>
    </div>
  {/if}
</header>
