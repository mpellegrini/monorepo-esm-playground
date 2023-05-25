<script lang="ts">
  import type { PageServerData } from './$types'

  import { goto } from '$app/navigation'

  export let data: PageServerData
  const sites = data.sites

  let profile_name = ''
  const viewProfile = async (): Promise<void> => {
    if (profile_name.trim() !== '') {
      await goto(`/profile/${profile_name.toLowerCase()}`)
    }
  }
</script>

{profile_name}
<div>
  <h1 class="text-4xl font-bold underline">Schools</h1>
  <input placeholder="Enter your profile name" bind:value="{profile_name}" />
  <button on:click="{viewProfile}">View</button>
  <ul class="flex items-center">
    {#each sites as site}
      <li>
        <div>
          <a href="/site/{site.slug}">
            <img class="m-5 w-52" src="{site.logo}" alt="{site.name}" />
          </a>
        </div>
      </li>
    {/each}
  </ul>
</div>
