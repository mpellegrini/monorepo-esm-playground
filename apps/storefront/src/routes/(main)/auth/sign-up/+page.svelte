<script lang="ts">
  import type { ActionData } from './$types'

  import { enhance } from '$app/forms'

  export let form: ActionData
</script>

<h1 class="text-5xl">Sign Up</h1>
<form method="post" use:enhance>
  <label for="username">Email address:</label>
  <input type="text" id="username" name="username" value="{form?.username ?? ''}" />
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" value="{form?.username ?? ''}" />
  <button type="submit" class="w-full rounded-lg bg-black px-3 py-2 text-white">Sign-up</button>
</form>
