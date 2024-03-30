<script>
  export let userData;
  document.title = `Frog Forum |  ${userData.fName}'s Profile`;
</script>

<p>user id: {userData._id}</p>
<p>user name: {`${userData.firstName} ${userData.lastName}`}</p>
<img
  src={userData.profilePicUrl}
  alt={`${userData.firstName} ${userData.lastName}'s profile pic`}
  class="profile-img"
/>
<p>user email: {userData.email}</p>
