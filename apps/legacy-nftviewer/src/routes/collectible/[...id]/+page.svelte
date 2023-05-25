<script lang="ts">
  import type { PageServerData } from './$types'

  import CollectibleDetails from '$lib/components/CollectibleDetails.svelte'

  export let data: PageServerData

  $: ({ collectibles } = data)
</script>

<nav class="flex" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    <li class="inline-flex items-center">
      <a
        href="/"
        class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
        <svg
          aria-hidden="true"
          class="mr-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
          ></path
          ></svg>
        Home
      </a>
    </li>
    <li class="inline-flex items-center">
      <div class="flex items-center">
        <svg
          aria-hidden="true"
          class="h-6 w-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"></path
          ></svg>
        <a href="/" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
          >{collectibles[0].site}</a>
      </div>
    </li>
    <li class="inline-flex items-center">
      <div class="flex items-center">
        <svg
          aria-hidden="true"
          class="h-6 w-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"></path
          ></svg>
        <span aria-current="page" class="ml-1 text-sm font-medium text-gray-400 md:ml-2"
          >{collectibles[0].title}</span>
      </div>
    </li>
  </ol>
</nav>

<CollectibleDetails collectibles="{collectibles}" />

<div class="columns-3">
  <ul>
    {#each collectibles as c}
      <li>
        <span
          ><a href="/profile/{c.owner?.toLowerCase()}">@{c.owner}</a>
          {c.edition_num} / {c.total_editions}</span>
      </li>
    {/each}
  </ul>
</div>
