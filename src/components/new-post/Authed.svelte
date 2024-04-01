<script>
  import { upload } from "../../int/s3";
  import { currentUser } from "../../stores";
  import { createPost } from "../../int/request/posts";
  import { navigate } from "svelte-routing";
  import Button from "../ui/Button.svelte";
  document.title = "Frog Forum | New Post";
  let imgURL;
  let pendingPost = false;
  let postSuccess = false;
  let postFailure = false;
  const handleSubmit = async (event) => {
    pendingPost = true;
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
      author: $currentUser._id,
      pic: imgURL,
      caption,
      date: new Date(),
    });
    if (postOutput.postId) {
      postSuccess = true;
      navigate(`/post/${postOutput.postId}?success=true`, { replace: false });
    } else {
      postFailure = true;
    }
    pendingPost = false;
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
  <div class="self-center">
    <Button type="submit">Submit</Button>
  </div>
</form>
{#if pendingPost}
  <p>saving...</p>
{:else if postFailure}
  <p>something went wrong</p>
{:else if postSuccess}
  <p>saved!</p>
{/if}

<!-- {#if imgURL}
  <p>showing image from <code>{imgURL}</code>:</p>
  <img src={imgURL} alt="frog pic" />
{/if} -->
