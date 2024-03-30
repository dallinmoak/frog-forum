<script>
  export let userData;
  document.title = `Frog Forum |  ${userData.name}'s Profile`;
</script>

<p>user id: {userData._id}</p>
<p>user name: {`${userData.firstName} ${userData.lastName}`}</p>
<img
  src={userData.profilePicUrl}
  alt={`${userData.firstName} ${userData.lastName}'s profile pic`}
/>
<p>user email: {userData.email}</p>
