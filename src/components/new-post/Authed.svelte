<script>
  import { upload } from "../../int/s3";
  import { currentUser } from "../../stores";
  import { navigate } from "svelte-routing";
  import Form from "../ui/Form.svelte";
  import FormItem from "../ui/FormItem.svelte";
  import { DataRequest } from "../../int/dataRequest";

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
    const uploadName = `user-upload-${$currentUser._id}/${new Date().valueOf()}.${extension}`;
    const uploadOutput = await upload(pic, uploadName);
    const status = uploadOutput.$metadata?.httpStatusCode;
    if (status == 200) {
      imgURL = `https://${import.meta.env.VITE_AWS_S3_BUCKET}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${uploadName}`;
    }
    const caption = formData.get("caption");
    const createPost = new DataRequest({
      entity: "post",
      func: "create",
    });
    const postOutput = await createPost.send({
      authorId: $currentUser._id,
      image: imgURL,
      caption,
    });
    if (postOutput.insertedId) {
      postSuccess = true;
      navigate(`/post/${postOutput.insertedId}?success=true`, {
        replace: false,
      });
    } else {
      postFailure = true;
    }
    pendingPost = false;
    event.target.reset();
  };
</script>

<div class="w-full flex justify-center">
  <Form {handleSubmit}>
    <FormItem label="Picture" type="file" name="frog-pic" required />
    <FormItem label="Caption" type="textarea" name="caption" required />
  </Form>
</div>

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
