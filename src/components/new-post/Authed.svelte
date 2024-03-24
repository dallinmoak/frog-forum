<script>
  document.title = "Frog Forum | New Post";
  const handleSubmit = (event) => {
    const formData = new FormData(event.target);
    // TODO send the picture to aws, then send that and the caption and the current user id to the server
    event.target.reset();
  };
</script>

<h1>New Post</h1>

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
