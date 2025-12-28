<script lang="ts">
  import type { Language } from "../../../types/projects/languages.js";
  import type { ProjectProps } from "../../../types/projects/projectsProps.js";
  import type { Tools } from "../../../types/projects/tools.js";
  import { Motion } from "svelte-motion";

  export let project: ProjectProps;

  let tool_tags: Tools[] = project.tags.tools;
  let lang_tags: Language[] = project.tags.lang;
  let hackathon_tag: string | null = project.tags.hackathon;
  let short_desc_visible: boolean = false;
  let flipped = false;

  let tag_map: Map<string, string[]> = new Map();
  tag_map.set("Languages", lang_tags);
  tag_map.set("Frameworks/Tools", tool_tags);

  function getProjectType(): string {
    if (hackathon_tag) {
      return hackathon_tag;
    } else {
      return "Personal";
    }
  }

  function handleMouseEnter() {
    short_desc_visible = true;
  }

  function handleMouseLeave() {
    short_desc_visible = false;
  }
</script>

<button
  type="button"
  class="group perspective-[1000px] relative w-[25vw] justify-center flex-col align-middle p-2 shrink-0"
  aria-label={`View details for ${project.header}`}
  tabindex="0"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click={(e:MouseEvent) => {flipped = !flipped }}
>
  <div
    class="relative h-full w-full shawdow-lg transition-transform duration-500 transform-3d"
    class:[transform:rotateY(180deg)]={flipped}
  >
    <div class="backface-hidden">
        <img
          src={project.cover_photo}
          class="cover"
          alt="project_cover"
        />

      <div class="relative w-full flex-col m-1">
        <div class="flex m-2 gap-4 items-center">
          <p class="header relative text-white">
            <b>{project.header}</b>
          </p>
          <div
            class="tag glass-morphism"
          >
            {getProjectType()}
          </div>
        </div>
        <div class="m-3">
          {#each tag_map.keys() as header}
            <p class="text-1xl text-white">{header}</p>
            <span class="border-t w-full block text-white m-1 opacity-45"
            ></span>
            <div
              class="text-white justify-center align-middle grid grid-cols-3 gap-2 mb-3"
            >
              {#each tag_map.get(header) as tag}
                <div class=" bg-white/35 tag">
                  {tag}
                </div>
              {/each}
            </div>
          {/each}
        </div>
        {#if short_desc_visible}
          <div
            class="view-box flex bg-white/70 h-full text-white justify-center items-center absolute w-full top-0"
          >
            <p>{project.short_desc}</p>
          </div>
        {/if}
      </div>
    </div>
    <div
      class="absolute flex flex-col p-3  items-center transform-[rotateY(180deg)] backface-hidden bg-white w-full h-full top-0 rounded-[10px] "
    >
      <p class="text-black self-start text-[2vw]">{project.header}</p>
      {#if project.video}
        <video class="media-content">
          <source src={project.video} type="video/mp4" />
          <track kind="captions" src="" label="No captions" />
        </video>
      {:else if project.photo}
        <img
          src={project.photo}
          class="rounded-[5px]"
          alt="project_image"
        />
      {:else}
        <p class="text-black text-2xl">Media not avaliable</p>
      {/if}
      <p class="text-black ">{project.long_desc}</p>
      <a href={project.github_link} on:click|stopPropagation class="text-[1vw]">{project.github_link}</a>
    </div>
  </div>
</button>


<style>
  .cover {
    height: 60%;
    width: 100%;
    object-fit: cover;
    mask-image: linear-gradient(to bottom, rgb(0, 0, 0, 1), rgb(0, 0, 0, 0));
    border-radius: 10px;
  }

  .header {
    font-size: calc(1vw + 1vh);
  }

  .tag {
    border-radius: 10px;
    font-size: calc(0.5vw + 0.5vh);
    padding: 4px;
    text-align: center;
    color: white;
  }

  .view-box {
    background: linear-gradient(to top, rgb(0, 0, 0, 1), rgb(0, 0, 0, 0.5));
  }
</style>
