<script>
  import MenuBar from "../components/menu_bar/MenuBar.svelte";
  import Home from "../components/home/Home.svelte";
</script>

<main>
  <MenuBar></MenuBar>
  <Home></Home>
</main>

<style lang="postcss">
  :global(body) {
    background-color: black;
  }

  main {
    display: flex;
    position:relative;
    flex-direction: column;
  }
</style>
