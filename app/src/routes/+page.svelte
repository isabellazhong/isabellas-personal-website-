<script>
  import MenuBar from "../components/menu_bar/MenuBar.svelte";
</script>

<main>
  <MenuBar></MenuBar>
</main>

<style lang="postcss">
  :global(body) {
    background-color: black;
  }

  main {
    display: flex;
    justify-content: center;
  }
</style>
