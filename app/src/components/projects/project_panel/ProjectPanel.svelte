<script lang="ts">
  import type { Language } from "../../../types/projects/languages.js";
  import type { ProjectProps } from "../../../types/projects/projectsProps.js";
  import type { Tools } from "../../../types/projects/tools.js";

  export let project: ProjectProps;
  let projectCard:HTMLDivElement;

  let toolTags: Tools[] = project.tags.tools;
  let langTags: Language[] = project.tags.lang;
  let hackathonTag: string | null = project.tags.hackathon;
  let shortDescVisible: boolean = false;
  let flipped = false;

  let tagMap: Map<string, string[]> = new Map();

  // card tilt vars
  let spring = {x:0, y:0};
  let rotationX:number = 0;
  let rotationY:number = 0; 
  const tiltDamper:number = 8; 

  tagMap.set("Languages", langTags);
  tagMap.set("Frameworks/Tools", toolTags);

  function getProjectType(): string {
    if (hackathonTag) {
      return hackathonTag;
    } else {
      return "Personal";
    }
  }

  function handleMouseEnter() {
    shortDescVisible = true;
  }

  function handleMouseLeave() {
    shortDescVisible = false;
    rotationX = 0;
    rotationY = 0;
  }

  function handleMouseCardTilt(e: MouseEvent) {
    const rect:DOMRect = projectCard.getBoundingClientRect();
    spring.x = e.clientX; 
    spring.y = e.clientY;

    const x = spring.x - rect.left; 
    const y = spring.y - rect.top;
    const centerX:number = rect.width/2;
    const centerY:number = rect.height/2;
    
    rotationX = Math.round((centerY - y) / tiltDamper); 
    rotationY =  Math.round(-(centerX - x) / tiltDamper);
  }

  function handleTouchCardTilt(e: TouchEvent) {
    const rect:DOMRect = projectCard.getBoundingClientRect();
    spring.x = e.touches[0].clientX; 
    spring.y = e.touches[0].clientY;

    const x = spring.x - rect.left; 
    const y = spring.y - rect.top;
    const centerX:number = rect.width/2;
    const centerY:number = rect.height/2;
    
    rotationX = Math.round((x - centerX) / tiltDamper); 
    rotationY = -Math.round((y - centerY) / tiltDamper); 
  }
</script>
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="card" 
  bind:this={projectCard}
  on:mousemove={handleMouseCardTilt}
  on:touchmove={handleTouchCardTilt}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <div class="card__translator">
    <button
    type="button"
    class="card__rotator group relative p-2"
    aria-label={`View details for ${project.header}`}
    tabindex="0"
    style="--rotate-x: {rotationX}deg; --rotate-y:{rotationY}deg"
    on:click={() => {flipped = !flipped }}
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
            {#each tagMap.keys() as header}
              <p class="text-1xl text-white">{header}</p>
              <span class="border-t w-full block text-white m-1 opacity-45"
              ></span>
              <div
                class="text-white justify-center align-middle grid grid-cols-3 gap-2 mb-3"
              >
                {#each tagMap.get(header) as tag}
                  <div class=" bg-white/35 tag">
                    {tag}
                  </div>
                {/each}
              </div>
            {/each}
          </div>
          {#if shortDescVisible}
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
  </div>
 
</div>

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

  .card__translator
  .card__rotator {
    perspective: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 25vw;
  }

  .card__rotator {
    transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
    transform-style: preserve-3d;
  }
</style>
