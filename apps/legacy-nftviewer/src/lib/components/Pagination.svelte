<script lang="ts">
  export let current_page: number
  export let per_page: number
  export let total: number

  const last_page = Math.ceil(total / per_page)
</script>

{#if per_page < total}
  <nav>
    <ul class="flex items-center gap-3 pt-4">
      <li>
        {#if current_page > 1}
          <a href="{(current_page - 1).toString()}">
            <span aria-hidden="true">&lt;</span>
          </a>
        {:else}
          <span aria-hidden="true">&lt;</span>
        {/if}
      </li>
      {#each Array(last_page) as _, idx}
        <li>
          <a href="{(idx + 1).toString()}" class="{current_page - 1 === idx ? 'font-bold' : ''}"
            >{idx + 1}</a>
        </li>
      {/each}
      <li>
        {#if current_page < last_page}
          <a href="{(current_page + 1).toString()}">
            <span aria-hidden="true">&gt;</span>
          </a>
        {:else}
          <span aria-hidden="true">&gt;</span>
        {/if}
      </li>
    </ul>
  </nav>
{/if}
