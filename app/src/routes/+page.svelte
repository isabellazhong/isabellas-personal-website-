<script lang="ts">
  import MenuBar from "../components/menu_bar/MenuBar.svelte";
  import Home from "../components/home/Home.svelte";
  import AboutMe from "../components/about_me/AboutMe.svelte";
  import { fadeIn } from "$lib/actions/fadeIn.js";
</script>

<main class="snap-y snap-mandatory overflow-y-scroll h-screen overflow-x-clip">
  <MenuBar></MenuBar>
  <section id="home_section" class="h-screen snap-start fade-in-section" use:fadeIn={{ threshold: 0.5, reset: true }}>
    <Home></Home>
  </section>
  <section
    id="about_me_section"
    class="snap-start h-screen fade-in-section translate-y-1/2"
    use:fadeIn={{ threshold: 0.5, reset: true }}
  >
    <AboutMe></AboutMe>
  </section>
</main>

<style lang="postcss">
  :global(body) {
    background-color: black;
  }

  .fade-in-section {
    opacity: 0;
    transition:
      opacity 0.8s ease-out,
      transform 0.8s ease-out;
  }

  :global(.fade-in-section.visible) {
    opacity: 1;
    transform: translateY(0);
  }

  main {
    display: flex;
    position: relative;
    flex-direction: column;
  }
</style>
