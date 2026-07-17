<script lang="ts">
  import MenuBar from "../components/menu_bar/MenuBar.svelte";
  import Home from "../components/home/Home.svelte";
  import AboutMe from "../components/about_me/AboutMe.svelte";
  import { fadeIn } from "$lib/actions/fadeIn.js";
  import Projects from "../components/projects/Projects.svelte";
</script>

<main
  class="snap-y snap-mandatory overflow-y-scroll h-screen w-screen overflow-x-clip"
>
  <MenuBar></MenuBar>
  <section
    id="home_section"
    class="snap-start h-screen fade-in-section"
    use:fadeIn={{ threshold: 0.2, reset: true }}
  >
    <Home></Home>
  </section>
  <section
    id="about_me_section"
    class="snap-start h-screen fade-in-section"
    use:fadeIn={{ threshold: 0.2, reset: true }}
  >
    <AboutMe></AboutMe>
  </section>
  <section
    id="projects_section"
    class=" snap-start h-screen fade-in-section"
    use:fadeIn={{ threshold: 0.2, reset: true }}
  >
    <Projects></Projects>
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
    position: relative;
  }
</style>
