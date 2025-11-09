<script lang="ts">
  import type { PopupPhotoProps } from "../../../types/about_me/photoProps.js";
  import { onMount, onDestroy } from "svelte";
  import AboutMeText from "../text/AboutMeText.svelte";

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

  // mouse movement vars
  let is_dragging = false;
  let is_hovering = false;

  // refs
  let container: HTMLDivElement; //for the ring container
  let image: HTMLDivElement;

  // position vars
  let start_x: number;
  let rotation = 0;

  let radius = 400;

  function handleMouseDown(e: MouseEvent) {
    is_dragging = true;
    start_x = e.clientX;
  }

  function handleTouchStart(e: TouchEvent) {
    is_dragging = true;
    start_x = e.touches[0].clientX;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!is_dragging) return;

    let delta_x: number;
    let new_x: number;

    new_x = e.clientX;
    delta_x = new_x - start_x;

    rotation += delta_x * 0.2;
    start_x = new_x;
  }

  function handleTouchMove(e: TouchEvent) {
    if (!is_dragging) return;

    let delta_x: number;
    let new_x: number;

    new_x = e.touches[0].clientX;
    delta_x = new_x - start_x;

    rotation += delta_x * 0.2;
    start_x = new_x;
  }

  function handleRingInteraction(e: MouseEvent) {
    image.focus();
    const center_x = container.clientWidth / 2;
    const center_y = container.clientHeight / 2;
    const mouse_x = e.clientX - container.clientLeft;
    const mouse_y = e.clientY - container.clientTop;

    const distance = Math.sqrt(
      (mouse_x - center_x) ** 2 + (mouse_y - center_y) ** 2
    );

    const outer_radius = radius + image.clientWidth;
    const inner_radius = radius - image.clientWidth;

    return distance >= inner_radius && distance <= outer_radius;
  }

  function handleRingMouseMove(e: MouseEvent) {
    if (handleRingInteraction(e)) is_hovering = true;

    if (is_dragging) handleMouseMove(e);
  }

  function handleRingMouseDown(e: MouseEvent) {
    if (handleRingInteraction(e)) handleMouseDown(e);
  }

  function getImageStyle(index: number): string {
    const totalImages = photos.length;
    const angleStep = 360 / totalImages;
    const baseAngle = index * angleStep;
    const angle = baseAngle + rotation;

    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    const fadeStart = -170;
    const fadeEnd = radius * 0.8;
    let opacity = 1;

    if (y > fadeStart) {
      opacity = Math.max(0, 1 - (y - fadeStart) / fadeEnd);
    }

    const scale = 0.7 + 0.3 * opacity;

    const tiltAngle = angle + 90;
    const zIndex = Math.floor(opacity * 100);
    const transition = is_dragging
      ? "none"
      : "transform 0.3s ease, opacity 0.3s ease";
    const cursor = is_dragging ? "grabbing" : "grab";
    const pointerEvents = opacity > 0.1 ? "auto" : "none";

    return `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${tiltAngle}deg) scale(${scale});
      opacity: ${opacity};
      width: 6vw;
      height: 6vw;
      border-radius: 16px;
      overflow: hidden;
      cursor: ${cursor};
      transition: ${transition};
      z-index: ${zIndex};
      pointer-events: ${pointerEvents};
    `
      .trim()
      .replace(/\s+/g, " ");
  }
</script>

<div
  class="w-full h-screen flex items-center justify-center "
>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={container}
    on:mousedown={handleRingMouseDown}
    on:mousemove={handleRingMouseMove}
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    class="relative w-full h-full flex items-center justify-center"
    style:cursor={is_hovering ? (is_dragging ? "grabbing" : "grab") : "default"}
  >
    {#each photos as photo, index}
      <div bind:this={image} style={getImageStyle(index)}>
        <img
          src={photo.src}
          alt={`Photo ${index + 1}`}
          class="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    {/each}
  </div>
  <AboutMeText></AboutMeText>
</div>

<style>
</style>
