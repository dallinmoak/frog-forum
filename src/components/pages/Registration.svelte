<script>
  import { upload } from "../../int/s3";
  import {
    currentUser,
    newRegistrationSuccessful,
    registrationData,
  } from "../../stores";
  import { userById, createUser } from "../../int/request/users";
  import { navigate } from "svelte-routing";
  document.title = "Frog Forum | Registration";
  const handleSubmit = async (event) => {
    const formData = new FormData(event.target);
    const fName = formData.get("fName");
    const lName = formData.get("lName");
    const birthdate = formData.get("birthdate");
    const profilePic = formData.get("profilePic");
    // @ts-ignore
    const extension = /(?:\.([^.]+))?$/.exec(profilePic.name)[1];
    const uploadName = `user-profile-pic-unregistered/${new Date().valueOf()}.${extension}`;
    const uploadOutput = await upload(profilePic, uploadName);
    const status = uploadOutput.$metadata?.httpStatusCode;
    let profilePicUrl = $registrationData.picture;
    if (status == 200) {
      profilePicUrl = `https://${import.meta.env.VITE_AWS_S3_BUCKET}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${uploadName}`;
    }
    const userToCreate = {
      auth0Id: $registrationData.sub,
      firstName: fName,
      lastName: lName,
      birthday: birthdate,
      email: $registrationData.email,
      profilePicUrl: profilePicUrl,
    };
    const newUser = await createUser(userToCreate);
    if (newUser) {
      $newRegistrationSuccessful = true;
      $currentUser = await userById(newUser.insertedId);
      navigate(`/profile/${newUser.insertedId}`);
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="fName">
    First Name:
    <input
      type="text"
      id="fName"
      name="fName"
      value={$registrationData.nickname}
      required
    />
  </label>
  <label for="lName">
    Last Name:
    <input type="text" id="lName" name="lName" required />
  </label>
  <label for="profilePic">
    Profile Picture:
    <input type="file" name="profilePic" id="profilePic" />
  </label>
  <label for="birthdate">
    Birthdate:
    <input type="date" name="birthdate" id="birthdate" />
  </label>
  <label for="currentPic">
    Current Picture:
    <img src={$registrationData.picture} alt="current user's profile pic" />
  </label>
  <button type="submit">Register</button>
</form>
