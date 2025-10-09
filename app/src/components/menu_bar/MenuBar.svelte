<script lang="ts">
    import MenuButtons from "./MenuButton.svelte";
    import type { ButtonProps } from "../../types/menu/buttonProps.ts"
    import MenuButton from "./MenuButton.svelte";

    const buttonElements: ButtonProps[] = [
        {id: 'aboutMeButton', buttonText: 'About Me'},
        {id: 'projectsButton', buttonText: 'Projects'},
        {id: 'experienceButton', buttonText: 'Experience'},
        {id: 'contactMeButton', buttonText: 'Contact Me'}
    ]
</script>

<div class="menu-bar">
    {#each buttonElements as button}
        <MenuButton targetElementID={button.id} buttonText={button.buttonText}></MenuButton>
    {/each}
</div>

<style>
    .menu-bar {
        width: 80vw; 
        stroke-width: 5%;
        padding: 20px;
        align-items: center;
        justify-items: center;
        display: flex;
        gap: 20px;
        position: absolute;
        
    }
</style>