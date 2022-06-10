<script context="module">
  import { KQL_Version } from "$lib/graphql/_kitql/graphqlStores";
  import { KitQLInfo } from "@kitql/all-in";

  export const load = async ({ fetch }) => {
   await KQL_Version.queryLoad({fetch})
   return {}
  }
</script>

<main class="container">

  <KitQLInfo store={KQL_Version}></KitQLInfo>

  <h2>Redwood Version - {$KQL_Version.data?.redwood.version}</h2>
  <p>Woot KitQL is on 🔥!</p>
  <a href="/graphql" target="_blanck">Local Graph<i>i</i>QL Yoga</a>
</main>