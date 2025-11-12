<script lang="ts">
  import MenuButtons from "./MenuButton.svelte";
  import type { ButtonProps } from "../../types/menu/buttonProps.ts";
  import MenuButton from "./MenuButton.svelte";
  

  const buttonElements: ButtonProps[] = [
    { target_id: "home_section", button_text: "Home"},
    { target_id: "about_me_section", button_text: "About Me"},
    { target_id: "projectsButton", button_text: "Projects"},
    { target_id: "experienceButton", button_text: "Experience"},
    { target_id: "contactMeButton", button_text: "Contact Me"},
  ];
</script>

<nav
  class="fixed w-4/5 p-5 flex items-center justify-center gap-5 top-0 left-1/2 transform -translate-x-1/2 z-10">
  {#each buttonElements as button}
    <MenuButton targetElementID={button.target_id} buttonText={button.button_text}></MenuButton>
  {/each}
</nav>