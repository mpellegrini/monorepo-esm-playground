<script lang="ts">
  import PageData = App.PageData

  export let data: PageData
</script>

<h1 class="mb-5 text-5xl">Welcome, {data.userId ?? 'anonymous'}</h1>

<div class="flex justify-around">
  {#if data.userId}
    <a
      href="/auth/sign-out"
      class="underline"
      data-sveltekit-preload-data="off"
      data-sveltekit-reload>Sign out</a>
  {:else}
    <a href="/auth/sign-up" class="underline">Sign up</a>
    <a href="/auth/sign-in" class="underline">Sign in</a>
  {/if}
</div>
