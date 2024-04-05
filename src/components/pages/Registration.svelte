<script>
  import { upload } from "../../int/s3";
  import {
    currentUser,
    newRegistrationSuccessful,
    registrationData,
  } from "../../stores";
  import { userById, createUser } from "../../int/request/users";
  import { navigate } from "svelte-routing";
  import PageHeading from "../ui/PageHeading.svelte";
  import Button from "../ui/Button.svelte";
  import Form from "../ui/Form.svelte";
  import FormItem from "../ui/FormItem.svelte";
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

  $: $registrationData = {
    nickname: "test",
    picture: "https://placehold.co/400",
  };
</script>

<PageHeading>Registration</PageHeading>
<div class="w-full flex justify-center">
  <Form {handleSubmit} sumbitText={"Register"}>
    <FormItem
      label="First Name: "
      type="text"
      name="fName"
      value={$registrationData.nickname}
      required
    />
    <FormItem label="Last Name:" type="text" name="lName" required />
    <FormItem label="Profile Picture:" type="file" name="profilePic" />
    <FormItem label="Birthdate:" type="date" name="birthdate" required />
    <FormItem
      label="Current Picture:"
      type="img"
      name="currentPic"
      previewImg={{
        src: $registrationData.picture,
        alt: "current user's profile pic",
      }}
    />
  </Form>
</div>
