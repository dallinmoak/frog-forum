<script>
  export let post;
  import { Link } from "svelte-routing";
  import { userById } from "../../int/request/users";
  import UserCard from "../ui/UserCard.svelte";
</script>

<Link
  to={`/post/${post._id}`}
  class="flex flex-col gap-3 m-[1em] p-[1em]  border-[3px] border-secondary rounded-[20px] bg-lightGrey no-underline"
>
  <div class="flex flex-row gap-3 items-center justify-between">
    {#await userById(post.authorId)}
      Fetching author...
    {:then author}
      <div class="min-w-[33%] sm:min-w-[55%]">
        <UserCard user={author} />
      </div>
    {:catch e}
      <p>{JSON.stringify(e)}</p>
    {/await}
    <p class="w-full text-sm text-right text-nowrap">
      {new Date(post.date).toLocaleString("en-us", { timeZone: "MST" })}
    </p>
  </div>
  <p>{post.caption ? post.caption : "Untitled"}</p>
  <div>
    <img class="rounded-[10px]" src={post.image} alt={post.caption} />
  </div>
</Link>
