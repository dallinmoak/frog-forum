<script>
  import { currentAuthStatus } from "../../stores";
  import Authed from "../new-post/Authed.svelte";
  import Unauthed from "../new-post/Unauthed.svelte";
  import PageHeading from "../ui/PageHeading.svelte";
</script>

<PageHeading>New Post</PageHeading>

{#if $currentAuthStatus}
  <Authed />
{:else}
  <Unauthed />
{/if}
