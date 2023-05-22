<script lang="ts">
  import type { PageServerData } from './$types'

  import { page } from '$app/stores'

  export let data: PageServerData
  const { totalItems, pageSize, collectibles } = data
  const totalPages = Math.ceil(totalItems / pageSize)
  $: currentPage = Number($page.params.page)
  $: prevPage = currentPage > 1 ? currentPage - 1 : null
  $: nextPage = currentPage < totalPages ? currentPage + 1 : null
</script>

<div class="flex flex-wrap lg:-mx-4">
  {#each collectibles as collectible}
    <div class="my-1 w-full px-1 md:w-1/2 lg:my-4 lg:w-1/3 lg:px-4">
      <article class="overflow-hidden rounded-lg shadow-lg">
        <a href="#top">
          <img class="block h-auto w-full" src="{collectible.asset}" alt="" />
        </a>
        <header class="flex items-start justify-between p-2 leading-tight md:p-4">
          <h1 class="line-clamp-1 text-lg">
            <a class="text-black no-underline hover:underline" href="#top">
              {collectible.title}
            </a>
          </h1>
          <p class="text-grey-darker text-sm">{collectible.total_editions}</p>
        </header>

        <footer class="flex items-center justify-between p-2 leading-none md:p-4">
          <a class="flex items-center text-black no-underline hover:underline" href="#top">
            <img
              alt="Placeholder"
              class="block rounded-full"
              src="https://picsum.photos/32/32/?random" />
            <p class="ml-2 text-sm">{collectible.site}</p>
          </a>
        </footer>
      </article>
    </div>
  {/each}
</div>

<div class="flex items-center gap-3 pt-4">
  <a href="{prevPage?.toString()}">&lt;</a>
  {#each Array(totalPages) as _, idx}
    <a
      href="{(idx + 1).toString()}"
      data-sveltekit-reload
      class="{currentPage - 1 === idx ? 'font-bold' : ''}">{idx + 1}</a>
  {/each}
  <a href="{nextPage?.toString()}">&gt;</a>
</div>
