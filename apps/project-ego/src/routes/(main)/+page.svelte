<script lang="ts">
  import type { PageData } from './$types'
  export let data: PageData
  const { posts } = data
</script>

<div class="mx-auto max-w-md space-y-2 px-8 pt-2">
  {#each posts as post}
    <details class="rounded-lg p-4 open:bg-sky-200 open:shadow-xl open:transition open:ease-in">
      <summary class="text-sm font-semibold leading-6">{post.title}</summary>
      <div class="mt-2">
        <p class="text-sm leading-6 text-gray-600">{post.body}</p>
      </div>
    </details>
  {/each}
</div>
