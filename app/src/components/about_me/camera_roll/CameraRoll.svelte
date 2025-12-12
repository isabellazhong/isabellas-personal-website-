<script lang="ts">
  import type { photoProps } from "../../../types/about_me/photoProps.js";
  import { onMount } from "svelte";
  import type { PopupPhotoProps } from "../../../types/about_me/photoProps.js";
  import PopupPhoto from "./popup_slides/PopupPhoto.svelte";
  import PopupSlides from "./popup_slides/PopupSlides.svelte";

  // hover params
  let hoveredIndex: number | null = null;
  const shiftDistance: number = 50;

  // rotation params
  let rotation: number = 0;
  let speed: number = 0;
  const friction: number = 0.8;
  let frame: number;
  let isMouseOverWheel: boolean = false;

  // popup params
  let isVisible: boolean = true;
  let currentPhoto: PopupPhotoProps | null = null;

  const photos: PopupPhotoProps[] = [
    {
      src: "/images/friends/climbing.jpg",
      tag: "friends",
      desc: "First time rock climbing w/ friends!",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/friends/escape_room.jpg",
      tag: "friends",
      desc: "Winning an escape room because we're just like that (we used 2 hints)",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/friends/cottage.JPG",
      tag: "friends",
      desc: "Cottage retreat! Very fun :D",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/friends/karaoke.JPG",
      tag: "friends",
      desc: "Karaoke night for my birthday :)",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/friends/scaddabush.jpg",
      tag: "friends",
      desc: "Very rare hangout with my friends from church",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/food/macarons.jpg",
      tag: "food",
      desc: "Finally succeeded making macarons",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/food/mashed_potatoes.jpg",
      tag: "food",
      desc: "Somewhat fancier dinner during midterm season",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/food/resevoir_lounge.jpg",
      tag: "food",
      desc: "A really yummy and cool meal at the Resevoir Lounge",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/paintings/landscape_painting.jpg",
      tag: "art",
      desc: "Made during a painting and bubble tea night event at school!",
      prev_photo: null,
      next_photo: null,
    },
    {
      src: "/images/paintings/fish_painting.JPG",
      tag: "art",
      desc: "Still hung up on my wall",
      prev_photo: null,
      next_photo: null,
    },
  ];

  const outerRadius: number = 800;
  const innerRadius: number = 500;

  let startAngle: number = 0;

  interface Slice extends PopupPhotoProps {
    startAngle: number;
    endAngle: number;
  }

  const slices: Slice[] = photos.map((photo) => {
    const angle = (1 / photos.length) * 2 * Math.PI;
    const slice = {
      startAngle,
      endAngle: startAngle + angle,
      tag: photo.tag,
      src: photo.src,
      desc: photo.desc,
      next_photo: photo.next_photo,
      prev_photo: photo.prev_photo,
    };
    startAngle += angle;
    return slice;
  });

  function describeArc(start: number, end: number) {
    const largeArc = end - start <= Math.PI ? 0 : 1;
    const x1 = Math.cos(start) * outerRadius;
    const y1 = Math.sin(start) * outerRadius;
    const x2 = Math.cos(end) * outerRadius;
    const y2 = Math.sin(end) * outerRadius;
    const x3 = Math.cos(end) * innerRadius;
    const y3 = Math.sin(end) * innerRadius;
    const x4 = Math.cos(start) * innerRadius;
    const y4 = Math.sin(start) * innerRadius;

    return `
        M ${x1} ${y1}
        A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
        L ${x3} ${y3}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
        Z
        `;
  }

  function handleClick(slice: PopupPhotoProps) {
    currentPhoto = slice;
    isVisible = true;
  }

  function closePopup() {
    isVisible = false;
    currentPhoto = null;
  }

  function getSliceTransform(
    index: number,
    startAngle: number,
    endAngle: number
  ) {
    if (hoveredIndex === index) {
      const midAngle = (startAngle + endAngle) / 2;
      const translateX = Math.cos(midAngle) * shiftDistance;
      const translateY = Math.sin(midAngle) * shiftDistance;
      return `translate(${translateX}, ${translateY})`;
    }
    return "";
  }

  function handleMouseMove(e: MouseEvent) {
    if (isMouseOverWheel) {
      speed += e.movementX * 0.1;
    }
  }

  function handleMouseEnter() {
    isMouseOverWheel = true;
  }

  function handleMouseLeave() {
    isMouseOverWheel = false;
  }

  let svgEl: SVGSVGElement | null = null;
  let groupEl: SVGGElement | null = null;

  onMount(() => {
    groupEl = svgEl?.querySelector("#wheel-group") as SVGGElement;

    function render() {
      if (groupEl) groupEl.style.transform = `rotate(${rotation}deg)`;
      rotation += speed;
      speed *= friction;
      frame = requestAnimationFrame(render);
    }

    if (svgEl) {
      svgEl.addEventListener("mousemove", handleMouseMove);
    }
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      if (svgEl) {
        svgEl.removeEventListener("mousemove", handleMouseMove);
      }
    };
  });
</script>

<div>
  <div class="absolute translate-y-1/2">
    {#if isVisible && currentPhoto}
      <PopupSlides current={currentPhoto} {isVisible} on:close={closePopup} />
    {/if}
  </div>

  <svg
    bind:this={svgEl}
    viewBox={`-${outerRadius * 2} -${outerRadius * 1.5} ${outerRadius * 4} ${outerRadius * 3}`}
    width="100%"
    height="auto"
    role="region"
    aria-label="Camera roll wheel"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <g id="wheel-group">
      <defs>
        {#each slices as slice, i}
          <pattern
            id={`img${i}`}
            patternUnits="userSpaceOnUse"
            width={outerRadius}
            height={outerRadius}
          >
            <image
              href={slice.src}
              x={-outerRadius}
              y={-outerRadius}
              width={outerRadius * 3}
              height={outerRadius * 3}
              preserveAspectRatio="xMidYMid slice"
              transform={`rotate(${(((slice.startAngle + slice.endAngle) / 2) * 180) / Math.PI + 90})`}
            />
          </pattern>
        {/each}
      </defs>
      {#each slices as slice, i}
        <path
          d={describeArc(slice.startAngle, slice.endAngle)}
          fill={`url(#img${i})`}
          stroke="black"
          stroke-width="20"
          role="button"
          tabindex="0"
          on:click={() => handleClick(slice)}
          on:keydown={(e) => e.key === "Enter" && handleClick(slice)}
          on:mouseenter={() => (hoveredIndex = i)}
          on:mouseleave={() => (hoveredIndex = null)}
          transform={getSliceTransform(i, slice.startAngle, slice.endAngle)}
          style="cursor: pointer; transition: transform 0.3s ease;"
        />
      {/each}
    </g>
  </svg>
</div>
