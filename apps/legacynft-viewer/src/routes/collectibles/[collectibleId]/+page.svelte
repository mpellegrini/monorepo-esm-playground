<script lang="ts">
  import type { PageServerData } from './$types'

  export let data: PageServerData
  const { collectible } = data
</script>

<section class="bg-gray-100 text-gray-900">
  <div class="container mx-auto px-5 py-24">
    <div class="mx-auto flex flex-wrap lg:w-4/5">
      <div class="w-full lg:w-1/2">
        <video
          muted
          autoplay
          loop
          preload="auto"
          playsinline
          class="rounded-lg shadow-2xl"
          src="{collectible.asset}"></video>
      </div>
      <div class="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
        <h2 class="mb-1 text-sm uppercase tracking-widest text-gray-500">{collectible.site}</h2>
        <h1 class="mb-1 text-4xl font-medium text-gray-900">
          {collectible.title}
        </h1>
        <div class="mb-4 flex">
          <span class="flex items-center"
            >{collectible.school} | {collectible.edition[0]} of {collectible.edition[1]}</span>
        </div>
        <p class="leading-relaxed">{collectible.description}</p>
      </div>
    </div>
  </div>
</section>
