<script lang="ts">
  import { projects } from "../../data/projects/projectData.js";
  import ProjectPanel from "./project_panel/ProjectPanel.svelte";
</script>

<div class="w-screen h-screen">
    {#each projects as project}  
        <ProjectPanel project={project}></ProjectPanel>
    {/each}
</div>