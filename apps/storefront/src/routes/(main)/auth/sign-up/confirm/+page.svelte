<script lang="ts">
  import { enhance } from '$app/forms'
  import type { ActionData } from './$types'

  export let form: ActionData
</script>

<h1 class="text-5xl">Confirm Email</h1>
<form method="post" use:enhance>
  <label for="code">Enter confirmation code:</label>
  <input type="text" id="code" name="code" value="{form?.code ?? ''}" />
  <button type="submit" class="w-full rounded-lg bg-black px-3 py-2 text-white"
    >Confirm Email
  </button>
</form>
