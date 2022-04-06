<script context="module">
  export const load = async ({ fetch }) => {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return {
        props: { ...(await response.json()) }
      }
    } catch (error) {
      console.error(`Error in load function for /: ${error}`)
    }
  }
</script>

<script>
  export let data
</script>

<main class="container">
  <h2>Redwood Version - {data.redwood.version}</h2>
  <p>Woot!</p>
</main>