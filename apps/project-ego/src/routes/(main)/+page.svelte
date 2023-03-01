<script lang="ts">
  import { page } from '$app/stores'
</script>

<h1 class="mb-5 text-5xl">Welcome , {$page.data.user ?? 'anonymous'}</h1>

<div class="flex justify-around">
  {#if $page.data.user}
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
