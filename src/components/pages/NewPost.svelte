<script>
  import { currentAuthStatus } from "../../stores";
  import Authed from "../new-post/Authed.svelte";
  import Unauthed from "../new-post/Unauthed.svelte";
</script>

<h1>New Post</h1>

{#if $currentAuthStatus}
  <Authed />
{:else}
  <Unauthed />
{/if}
