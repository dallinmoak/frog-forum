<script>
  import { Router, Route } from "svelte-routing";
  import Header from "./components/Header.svelte";
  import Home from "./components/pages/Home.svelte";
  import Profile from "./components/pages/Profile.svelte";
  import NewPost from "./components/pages/NewPost.svelte";
  import { onMount } from "svelte";
  import { initializeAuth, createClient } from "./auth";
  import { currentAuth0Client } from "./stores";
  import Post from "./components/pages/Post.svelte";
  import Registration from "./components/pages/Registration.svelte";
  import Page from "./components/ui/Page.svelte";
  import PageHeading from "./components/ui/PageHeading.svelte";
  onMount(async () => {
    if (!$currentAuth0Client) {
      $currentAuth0Client = await createClient();
    }
    initializeAuth($currentAuth0Client);
  });
</script>

<main>
  <!-- {"currentAuth0Client: " + JSON.stringify($currentAuth0Client)} -->
  <!-- {"currentAuthStatus: " + JSON.stringify($currentAuthStatus)} -->
  <!-- {"currentAuthStatus: " + JSON.stringify($currentUser)} -->
  <Router>
    <Header />
    <Page>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/profile/:userId" let:params>
        <Profile userId={params.userId} />
      </Route>
      <Route path="/new-post">
        <NewPost />
      </Route>
      <Route path="/post/:postId" let:params>
        <Post postId={params.postId} />
      </Route>
      <Route path="/registration">
        <Registration />
      </Route>
      <Route path="*">
        <PageHeading>404</PageHeading>
        <h3 class="text-center">
          route <span class="font-mono bg-slate-200 rounded-md px-1"
            >{window.location}</span
          > not found
        </h3>
      </Route>
    </Page>
  </Router>
</main>
