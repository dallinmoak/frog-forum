<script>
  import Button from "./Button.svelte";

  export let handleSubmit;
  export let sumbitText = "Submit";
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="max-w-lg min-w-full sm:min-w-[30em] flex flex-col gap-4 px-5"
>
  <slot />
  <div class="self-center">
    <Button type="submit">{sumbitText}</Button>
  </div>
</form>
