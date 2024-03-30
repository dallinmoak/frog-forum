<script>
  export let userData;
  document.title = `Frog Forum |  ${userData.name}'s Profile`;
</script>

<p>user id: {userData.id}</p>
<p>user name: {userData.name}</p>
<img
  src={userData.picture}
  alt={`${userData.name}'s profile pic`}
  class="profile-img"
/>
<p>user email: {userData.email}</p>
