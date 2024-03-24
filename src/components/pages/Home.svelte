<script>
  import { currentAuthStatus } from "../../stores";
  import Authed from "../home/Authed.svelte";
</script>

{#if $currentAuthStatus}
  <Authed />
{:else}
  <p>unathed view here</p>
{/if}
