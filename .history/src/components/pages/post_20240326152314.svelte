<script>
export let userId

import ProfileData from "../ProfileData.svelte";
  $: isCurrentUser = $currentUser?.id == userId;
  let userDataPromise = userById(userId);
</script>



<h1>
  your post
</h1>