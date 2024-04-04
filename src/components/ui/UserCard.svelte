<script>
  import { Link } from "svelte-routing";
  import Button from "./Button.svelte";
  import UserCardInner from "./UserCardInner.svelte";

  export let user;
  export let variant = "default";

  const variants = {
    default: {
      img: "h-8 w-8 object-cover",
      container:
        "gap-1 p-[0.5em] w-[fit-content]  hover:bg-primary transition-colors",
      name: "text-md",
      supplemental: "hidden",
      follow: "hidden",
    },
    large: {
      img: "h-14 w-14 object-cover",
      container:
        "gap-2 p-[0.75em] w-[fit-content] hover:bg-primary transition-colors",
      name: "text-lg",
      supplemental: "text-sm pl-1",
      follow: "",
    },
    page: {
      img: "h-[14em] w-[14em] object-cover",
      container: "gap-2 p-[0.75em] min-h-[20em] cursor-default",
      name: "text-[2.4em]",
      supplemental: "text-lg",
      follow: "text-[1.7em]",
    },
  };
</script>

<div
  class="[&>*]:flex [&>*]:flex-row [&>*]:flex-wrap [&>*]:justify-between [&>*]:items-center [&>*]:rounded-md [&>*]:no-underline [&>*]:bg-primary-light [&>*]:my-1"
>
  {#if variant == "page"}
    <div class={variants[variant].container}>
      <UserCardInner {variant} {variants} {user} />
    </div>
  {:else}
    <Link to={`/profile/${user._id}`} class={variants[variant].container}>
      <UserCardInner {variant} {variants} {user} />
    </Link>
  {/if}
</div>
