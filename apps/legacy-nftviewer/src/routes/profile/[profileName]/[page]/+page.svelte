<script lang="ts">
  import type { PageServerData } from './$types'

  import { page } from '$app/stores'
  import Pagination from '$lib/components/Pagination.svelte'

  export let data: PageServerData

  $: collectibles = data.collectibles
  const { totalItems, pageSize } = data
  $: currentPage = Number($page.params.page)
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
        <span aria-current="page" class="ml-1 text-sm font-medium text-gray-400 md:ml-2"
          >@{collectibles[0].owner}</span>
      </div>
    </li>
  </ol>
</nav>

<div
  class="grid grid-cols-2 gap-x-4 gap-y-1 lg:col-span-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-6 2xl:grid-cols-5">
  {#each collectibles as collectible}
    <a
      href="/collectible/{collectible.id}/{collectible.edition_num}"
      class="fade-in lg:-20 group relative cursor-pointer text-sm duration-300">
      <div
        class="fade-in group-hover:shadow-me square aspect-w-1 aspect-h-1 relative w-full overflow-hidden rounded-xl bg-gray-100 duration-300 lg:group-hover:scale-[1.01]">
        <!--        <div-->
        <!--          class="-->
        <!--            absolute z-50 h-full w-full bg-white opacity-0">-->
        <!--        </div>-->
        <!--        <div-->
        <!--          class="animate-flash-once-->
        <!--            absolute z-50 h-full w-full bg-white opacity-0">-->
        <!--        </div>-->
        <img
          class="aspect-square h-full w-full duration-300"
          src="{collectible.asset_thumbnail}"
          alt="" />
      </div>
      <p class="text-3xs mt-3 line-clamp-1 text-center uppercase tracking-widest opacity-50">
        {collectible.title}
      </p>
      <h3 class="font-400 -mt-1 pb-2 text-center text-xs uppercase tracking-wider">
        Total Editions: {collectible.total_editions}
      </h3></a>

    <!--    <div class="my-1 w-full px-1 md:w-1/2 lg:my-4 lg:w-1/3 lg:px-4">-->
    <!--      <article class="overflow-hidden rounded-lg shadow-lg">-->
    <!--        <a href="#top">-->
    <!--          <img class="block h-auto w-full" src="{collectible.asset}" alt="" />-->
    <!--        </a>-->
    <!--        <header class="flex items-start justify-between p-2 leading-tight md:p-4">-->
    <!--          <h1 class="line-clamp-1 text-lg">-->
    <!--            <a class="text-black no-underline hover:underline" href="#top">-->
    <!--              {collectible.title}-->
    <!--            </a>-->
    <!--          </h1>-->
    <!--          <p class="text-grey-darker text-sm">{collectible.total_editions}</p>-->
    <!--        </header>-->

    <!--        <footer class="flex items-center justify-between p-2 leading-none md:p-4">-->
    <!--          <a class="flex items-center text-black no-underline hover:underline" href="#top">-->
    <!--            <img-->
    <!--              alt="Placeholder"-->
    <!--              class="block rounded-full"-->
    <!--              src="https://picsum.photos/32/32/?random" />-->
    <!--            <p class="ml-2 text-sm">{collectible.site}</p>-->
    <!--          </a>-->
    <!--        </footer>-->
    <!--      </article>-->
    <!--    </div>-->
  {:else}
    <p>No collectibles found</p>
  {/each}
</div>

<Pagination current_page="{currentPage}" total="{totalItems}" per_page="{pageSize}" />
