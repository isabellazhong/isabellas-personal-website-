<script lang="ts">
  import { projects } from "../../data/projects/projectData.js";
  import ProjectPanel from "./project_panel/ProjectPanel.svelte";
</script>

<div class="w-screen h-full flex-col justify-cneter">
    <h1 class="text-white">projects</h1>
    <div class="flex m-10">
        {#each projects as project}  
            <ProjectPanel project={project}></ProjectPanel>
        {/each}
    </div>
</div>