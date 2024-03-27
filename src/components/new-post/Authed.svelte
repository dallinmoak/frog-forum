<script>
  import { upload } from "../../int/s3";
  import { currentUser } from "../../stores";
  document.title = "Frog Forum | New Post";
  let currentImgFiles;
  let uploadOutput;
  const handleSubmit = async (event) => {
    const formData = new FormData(event.target);
    const pic = formData.get("frog-pic");
    console.log(pic);
    const uploadName = `user-upload-${$currentUser.id}-${new Date().valueOf()}`;
    uploadOutput = await upload(pic, uploadName);
    console.log(currentImgFiles);
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
      bind:files={currentImgFiles}
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
