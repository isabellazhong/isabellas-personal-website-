<script lang="ts">
  import MenuButtons from "./MenuButton.svelte";
  import type { ButtonProps } from "../../types/menu/buttonProps.ts";
  import MenuButton from "./MenuButton.svelte";
  

  const buttonElements: ButtonProps[] = [
    { id: "aboutMeButton", buttonText: "About Me" },
    { id: "projectsButton", buttonText: "Projects" },
    { id: "experienceButton", buttonText: "Experience" },
    { id: "contactMeButton", buttonText: "Contact Me" },
  ];
</script>

<div
  class="relative w-4/5 p-5 flex items-center justify-center gap-5 fixed top-0 left-1/2 transform -translate-x-1/2 z-10">
  {#each buttonElements as button}
    <MenuButton targetElementID={button.id} buttonText={button.buttonText}></MenuButton>
  {/each}
</div>