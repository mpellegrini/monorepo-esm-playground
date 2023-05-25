<script lang="ts">
  import '../app.css'

  let scroll: number
</script>

<svelte:window bind:scrollY="{scroll}" />

<h1 class="fixed z-10">{scroll}</h1>
<nav class="flex h-12 bg-gray-300 align-middle">
  <ul class="flex items-center space-x-5">
    <li class="ml-5">
      <a href="/">Home</a>
    </li>
  </ul>
</nav>
<main class="container mx-auto my-12 px-4 md:px-12">
  <slot />
</main>
