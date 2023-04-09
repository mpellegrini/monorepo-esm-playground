<script lang="ts">
  export let dateValue = new Date().toISOString()

  const formatted = new Intl.DateTimeFormat().format(new Date(dateValue))
</script>

<span>{formatted}</span>
