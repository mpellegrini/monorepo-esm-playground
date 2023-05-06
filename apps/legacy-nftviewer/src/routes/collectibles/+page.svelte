<script lang="ts">
  import type { PageServerData } from './$types'

  export let data: PageServerData

  const collectibles = data.collectibles
</script>

<ul>
  {#each collectibles as collectible}
    <li><a href="{`/collectibles/${collectible.id}`}">{collectible.title}</a></li>
  {/each}
</ul>
