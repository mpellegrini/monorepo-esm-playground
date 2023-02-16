<script lang="ts" context="module">
  import '../app.css'
  import { initializeAmplify } from '$lib/amplify'

  initializeAmplify()
</script>

<div class="container mx-auto">
  <slot />
</div>
