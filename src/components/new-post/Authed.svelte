<script>
  import { upload } from "../../int/s3";
  import { currentUser } from "../../stores";
  import { createPost } from "../../int/request";
  document.title = "Frog Forum | New Post";
  let imgURL;
  let postState = "not submmited";
  const handleSubmit = async (event) => {
    let postCreated = "pending creation";
    const formData = new FormData(event.target);
    const pic = formData.get("frog-pic");
    // @ts-ignore
    const extension = /(?:\.([^.]+))?$/.exec(pic.name)[1];
    const uploadName = `user-upload-${$currentUser.id}/${new Date().valueOf()}.${extension}`;
    const uploadOutput = await upload(pic, uploadName);
    const status = uploadOutput.$metadata?.httpStatusCode;
    if (status == 200) {
      imgURL = `https://${import.meta.env.VITE_AWS_S3_BUCKET}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${uploadName}`;
    }
    const caption = formData.get("caption");
    const postOutput = await createPost({
      author: $currentUser.id,
      pic: imgURL,
      caption,
      date: new Date(),
    });
    console.log(postOutput);
    if (postOutput.postId) {
      postCreated = "created";
    } else {
      postCreated = "failed";
    }
    event.target.reset();
  };
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="max-w-lg flex flex-col gap-4 px-5"
>
  <div class="flex flex-col">
    <label for="frog-pic">Frog Pic</label>
    <input
      type="file"
      id="frog-pic"
      name="frog-pic"
      required
      class="bg-slate-100 p-2 rounded-md"
    />
  </div>
  <div class="flex flex-col">
    <label for="caption">Post Caption</label>
    <textarea id="caption" name="caption" class="bg-slate-100 p-2 rounded-md"
    ></textarea>
  </div>

  <button type="submit">Submit</button>
</form>
{#if postState == "pending creation"}
  <p>saving...</p>
{:else if postState == "created"}
  <p>saved!</p>
{:else if postState == "failed"}
  <p>something went wrong</p>
{/if}

<!-- {#if imgURL}
  <p>showing image from <code>{imgURL}</code>:</p>
  <img src={imgURL} alt="frog pic" />
{/if} -->
