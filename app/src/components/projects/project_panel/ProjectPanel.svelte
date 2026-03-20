<script lang="ts">
  import type { Language } from "../../../types/projects/languages.js";
  import type { ProjectProps } from "../../../types/projects/projectsProps.js";
  import type { Tools } from "../../../types/projects/tools.js";
  import "../filter.css"

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

  let pointer_x: string = "50%";
  let pointer_y: string = "50%";

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

  function handleMouseMove(e: MouseEvent) {
    const rect:DOMRect = projectCard.getBoundingClientRect();
    spring.x = e.clientX; 
    spring.y = e.clientY;

    const x = spring.x - rect.left; 
    const y = spring.y - rect.top;
    const centerX:number = rect.width/2;
    const centerY:number = rect.height/2;
    pointer_x = `${(x / rect.width) * 100}%`;
    pointer_y = `${(y / rect.height) * 100}%`;
    
    rotationX = Math.round((centerY - y) / tiltDamper); 
    rotationY =  Math.round(-(centerX - x) / tiltDamper);
  }

  function handleTouchMove(e: TouchEvent) {
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
  on:mousemove={handleMouseMove}
  on:touchmove={handleTouchMove}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <div class="card__translator">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
    class="card__rotator group relative p-2"
    aria-label={`View details for ${project.header}`}
    style="--rotate-x: {rotationX}deg; --rotate-y:{rotationY}deg; --pointer-x:{pointer_x}; --pointer-y:{pointer_y}"
    on:click={() => {flipped = !flipped }}
  >
    <div
      class="relative h-full w-full shawdow-lg transition-transform duration-500 transform-3d"
      class:[transform:rotateY(180deg)]={flipped}
    >
      <div class="card-front backface-hidden rounded-[10px]">
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
          {#if shortDescVisible && flipped == false}
            <div
              class="view-box flex bg-white/70 h-full text-white justify-center items-center absolute w-full top-0"
            >
              <p>{project.short_desc}</p>
            </div>
          {/if}
        </div>
      </div>
      <div
        class="card-back absolute flex flex-col p-3 items-center
        transform-[rotateY(180deg)] backface-hidden bg-[#0b0d14] 
        w-full h-full top-0 rounded-[10px]"
      >
        <p class="text-white self-start text-[2vw]">{project.header}</p>
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
          <p class="text-white text-2xl">Media not avaliable</p>
        {/if}
        <div class="project-text-container text-white">
          <p>{project.long_desc}</p>
        </div>
        <div class="card__shine"></div>
        <div class="card__glare"></div>
      </div>
    </div>
  </div>
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

  .card__shine {
    position: absolute;
    inset: 0;
    border-radius: 10px;
    pointer-events: none;

    mix-blend-mode: color-dodge;
    opacity: 0.6;
  }

  .card__shine::before,
  .card__shine::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }

  .card__shine:before{ 
    content: "";
  
    background: linear-gradient(
      120deg,
      var(--sunpillar-clr-1),
      var(--sunpillar-clr-2),
      var(--sunpillar-clr-3),
      var(--sunpillar-clr-4),
      var(--sunpillar-clr-5),
      var(--sunpillar-clr-6),
      var(--sunpillar-clr-1),
      transparent 80%
    );
    background-size: auto;
    opacity: 50%;
  }

  .card__shine:after {
  content: "";

  background: linear-gradient(
    65deg,
    transparent 20%,
    var(--sunpillar-clr-1) 10%,
    var(--sunpillar-clr-2) 10%,
    var(--sunpillar-clr-3) 10%,
    var(--sunpillar-clr-4) 10%,
    var(--sunpillar-clr-5) 10%,
    );

    background-size: 500% 500%;
    background-position: var(--pointer-x) var(--pointer-y);
  }

  .card__glare {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;

    background: radial-gradient(
      circle at var(--pointer-x) var(--pointer-y),
      rgba(255,255,255,0.8) 20%,
      rgba(255,255,255,0.4) 50%,
      rgba(0,0,0,0.4) 90%
    );

    mix-blend-mode: overlay;
  }

</style>
