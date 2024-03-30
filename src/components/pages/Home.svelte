<script>
  import { currentAuthStatus } from "../../stores";
  import Authed from "../home/Authed.svelte";
  import Unauthed from "../home/Unauthed.svelte";
</script>

{#if $currentAuthStatus}
  <Authed />
{:else}
  <Unauthed />
{/if}
