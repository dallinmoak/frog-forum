<script>
  //@ts-nocheck
  export let type = "button";
</script>

<button
  {type}
  on:click
  class="bg-secondary-light rounded-lg outline outline-1 outline-offset-[0.4px] outline-darkGrey text-darkGray hover:bg-secondary hover:text-lightGrey transition-colors px-3 py-1"
>
  <slot />
</button>
