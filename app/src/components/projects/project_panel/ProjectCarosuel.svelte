<script lang="ts">
    import ProjectPanel from "./ProjectPanel.svelte";
    import { projects } from "../../../data/projects/projectData.js";
</script>

<div class="flex items-center w-full overflow-x-scroll hide">
        {#each projects as project}  
            <ProjectPanel project={project}></ProjectPanel>
        {/each}
</div>

<style>
    .hide::-webkit-scrollbar {
        display: none;
    }
</style>