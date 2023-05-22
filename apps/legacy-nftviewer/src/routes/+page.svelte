<script lang="ts">
  import type { PageServerData } from './$types'

  export let data: PageServerData
  const sites = data.sites
</script>

<div>
  <h1 class="text-4xl font-bold underline">Schools</h1>
  <ul>
    {#each sites as site}
      <li class="">
        <img class="m-5 w-52" src="{site.logo}" alt="{site.name}" />
        <a href="/{site.slug}">View</a>
      </li>
    {/each}
  </ul>
</div>
