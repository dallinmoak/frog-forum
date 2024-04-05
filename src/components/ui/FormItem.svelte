<script>
  export let label;
  export let type;
  export let name;
  export let value = "";
  export let required = false;
  export let previewImg = null;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="flex flex-col">
  {label}
  {#if previewImg}
    <img
      class="rounded-[50%] w-[16em] h-[16em] object-contain self-center"
      src={previewImg?.src}
      alt={previewImg?.alt}
    />
  {:else if type == "textarea"}
    <textarea id={name} {name} {required} class="bg-slate-100 p-2 rounded-md"
    ></textarea>
  {:else}
    <input
      {type}
      {value}
      id={name}
      {name}
      {required}
      class="bg-slate-100 p-2 rounded-md"
    />
  {/if}
</label>
