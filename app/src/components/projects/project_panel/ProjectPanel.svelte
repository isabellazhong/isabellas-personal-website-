<script lang="ts">
  import type { Language } from "../../../types/projects/languages.js";
  import type { ProjectProps } from "../../../types/projects/projectsProps.js";
  import type { Tools } from "../../../types/projects/tools.js";

  export let project: ProjectProps;

    let tool_tags: Tools[] = project.tags.tools; 
    let lang_tags: Language[] = project.tags.lang; 
    let hackathon_tag: string | null = project.tags.hackathon; 

    let tag_map: Map<string, string[]> = new Map();
    tag_map.set("Languages", lang_tags);
    tag_map.set("Frameworks/Tools", tool_tags);

</script>

<div class="w-[25vw] h-[50vh] justify-center flex-col align-middle translate-y-1/2 m-5">
  {#if project.video}
    <video class="media-content">
      <source src={project.video} type="video/mp4" />
      <track kind="captions" src="" label="No captions" />
    </video>
  {:else if project.photo}
    <img src={project.photo} class="media-content" alt="project_image" />
  {:else}
    <p>Media not avaliable</p>
  {/if}

  <div class="h-1/2 w-full flex-col m-1">
    <p class="header relative text-white m-2">
    {project.header}
    </p>
    <div class="m-3">
        {#each tag_map.keys() as header} 
            <p class="text-1xl text-white">{header}</p>
            <span class="border-t w-full block text-white m-1 opacity-45"></span>
            <div class="text-white justify-center align-middle grid grid-cols-4 grid-rows-1 gap-2 mb-3">
                {#each tag_map.get(header) as tag}
                    <div class="rounded-[50px] bg-white/35 text-center tag">
                        {tag}
                    </div>
                {/each}
            </div>
        {/each}
    </div>

  </div>
</div>

<style>
  .media-content {
    height: 60%;
    width: 100%;
    object-fit: cover;
    mask-image: linear-gradient(to bottom, rgb(0, 0, 0, 1), rgb(0, 0, 0, 0));
    border-radius: 25px;
  }

  .header {
    font-size: calc(1vw + 1vh);
  }

  .tag {
    font-size: calc(0.5vw + 0.5vh);
    padding:2px;
  }

  .tag:hover {
    opacity: 80%;
  }
</style>