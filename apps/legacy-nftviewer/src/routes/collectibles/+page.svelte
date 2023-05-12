<script lang="ts">
  import type { PageServerData } from './$types'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const schools = {
    UCF: {
      name: 'University of Central Florida',
      site: 'Charge On',
    },
    Oklahoma: {
      name: 'The University of Oklahoma',
      site: 'Boomer Sooner',
    },
    Villanova: {
      name: 'Villanova University',
      site: 'Nova Nation',
    },
    Clemson: {
      name: 'Clemson University',
      site: 'The Paw',
    },
    Kentucky: {
      name: 'University of Kentucky',
      site: 'Blue Chips',
    },
    Kansas: {
      name: 'The University of Kansas',
      site: 'Rock Chalk',
    },
  }

  export let data: PageServerData

  const collectibles = data.collectibles
</script>

<ul>
  {#each collectibles as collectible}
    <li><a href="{`/collectibles/${collectible.id}`}">{collectible.title}</a></li>
  {/each}
</ul>
