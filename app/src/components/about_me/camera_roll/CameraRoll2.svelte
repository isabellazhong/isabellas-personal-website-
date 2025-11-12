<script lang="ts">
  import type { PopupPhotoProps } from "../../../types/about_me/photoProps.js";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import AboutMeText from "../text/AboutMeText.svelte";
  import PopupSlides from "./popup_slides/PopupSlides.svelte";

  let photos: PopupPhotoProps[] = [
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
  let is_momentum_scrolling = false;

  // refs
  let container: HTMLDivElement; //for the ring container
  let imageElements: HTMLDivElement[] = [];

  // position vars
  let start_x: number;
  let rotation = 0;
  let velocity = 0;
  let last_x: number;
  let last_time: number;
  let animation_frame: number | null = null;

  let radius = 400;

  // Performance optimization: Cache calculations
  let totalImages = photos.length;
  let angleStep = 360 / totalImages;
  let fadeStart = -170;
  let fadeEnd = radius * 0.8;

  // popup vars
  let visible = false;
  let global_current_photo: PopupPhotoProps; 

  // Optimized position update function
  function updateImagePositions() {
    imageElements.forEach((element, index) => {
      if (element) {
        const baseAngle = index * angleStep;
        const angle = baseAngle + rotation;
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * radius;
        const y = Math.sin(radian) * radius;

        let opacity = 1;
        if (y > fadeStart) {
          opacity = Math.max(0, 1 - (y - fadeStart) / fadeEnd);
        }

        const scale = 0.7 + 0.3 * opacity;
        const tiltAngle = angle + 90;
        const zIndex = Math.floor(opacity * 100);

        // Use transform3d for hardware acceleration
        element.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0) rotate(${tiltAngle}deg) scale(${scale})`;
        element.style.opacity = opacity.toString();
        element.style.zIndex = zIndex.toString();
        element.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
      }
    });

    // Clear the animation frame flag
    animation_frame = null;
  }

  function handleMouseDown(e: MouseEvent) {
    is_dragging = true;
    is_momentum_scrolling = false;
    start_x = e.clientX;
    last_x = e.clientX;
    last_time = Date.now();
    velocity = 0;

    // Stop any ongoing momentum animation
    if (
      animation_frame !== null &&
      typeof cancelAnimationFrame !== "undefined"
    ) {
      cancelAnimationFrame(animation_frame);
      animation_frame = null;
    }

    e.preventDefault();
  }

  function handleTouchStart(e: TouchEvent) {
    is_dragging = true;
    is_momentum_scrolling = false;
    start_x = e.touches[0].clientX;
    last_x = e.touches[0].clientX;
    last_time = Date.now();
    velocity = 0;

    // Stop any ongoing momentum animation
    if (
      animation_frame !== null &&
      typeof cancelAnimationFrame !== "undefined"
    ) {
      cancelAnimationFrame(animation_frame);
      animation_frame = null;
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (!is_dragging || !browser) return;

    const current_time = Date.now();
    const time_delta = current_time - last_time;

    if (time_delta > 0) {
      const current_x = e.clientX;
      const delta_x = current_x - last_x;

      // Calculate velocity for momentum
      velocity = delta_x / time_delta;

      // Apply rotation with smoother multiplier
      rotation += delta_x * 0.2;

      last_x = current_x;
      last_time = current_time;

      // Use requestAnimationFrame for smooth updates
      if (!animation_frame && typeof requestAnimationFrame !== "undefined") {
        animation_frame = requestAnimationFrame(updateImagePositions);
      }
    }
  }

  function handleTouchMove(e: TouchEvent) {
    if (!is_dragging || !browser) return;

    e.preventDefault();

    const current_time = Date.now();
    const time_delta = current_time - last_time;

    if (time_delta > 0) {
      const current_x = e.touches[0].clientX;
      const delta_x = current_x - last_x;

      // Calculate velocity for momentum
      velocity = delta_x / time_delta;

      // Apply rotation with consistent multiplier
      rotation += delta_x * 0.2;

      last_x = current_x;
      last_time = current_time;

      // Use requestAnimationFrame for smooth updates
      if (!animation_frame && typeof requestAnimationFrame !== "undefined") {
        animation_frame = requestAnimationFrame(updateImagePositions);
      }
    }
  }

  function handleMouseUp() {
    if (!is_dragging) return;
    is_dragging = false;

    // Apply momentum scrolling
    if (Math.abs(velocity) > 0.05) {
      applyMomentum();
    }
  }

  function handleTouchEnd() {
    if (!is_dragging) return;
    is_dragging = false;

    // Apply momentum scrolling
    if (Math.abs(velocity) > 0.05) {
      applyMomentum();
    }
  }

  function applyMomentum() {
    // Only run in browser environment
    if (!browser || typeof requestAnimationFrame === "undefined" || typeof window === "undefined") {
      return;
    }

    is_momentum_scrolling = true;
    const friction = 0.85; // Increased friction for smoother momentum
    const min_velocity = 0.005; // Lower minimum for smoother stopping
    let last_animation_time = Date.now();

    function animate() {
      const current_time = Date.now();
      const delta_time = current_time - last_animation_time;
      last_animation_time = current_time;

      if (Math.abs(velocity) < min_velocity) {
        velocity = 0;
        is_momentum_scrolling = false;
        animation_frame = null;
        return;
      }

      // Apply rotation based on velocity with better scaling
      rotation += velocity * 0.3 * delta_time;

      // Apply friction with frame-rate independent calculation
      velocity *= Math.pow(friction, delta_time / 16);

      // Update positions
      updateImagePositions();

      animation_frame = requestAnimationFrame(animate);
    }

    last_animation_time = Date.now();
    animation_frame = requestAnimationFrame(animate);
  }

  function handleRingInteraction(e: MouseEvent) {
    if (!container || imageElements.length === 0) return;
    const center_x = container.clientWidth / 2;
    const center_y = container.clientHeight / 2;
    const mouse_x = e.clientX - container.clientLeft;
    const mouse_y = e.clientY - container.clientTop;

    const distance = Math.sqrt(
      (mouse_x - center_x) ** 2 + (mouse_y - center_y) ** 2
    );

    // Use a representative image element for size calculations
    const sampleImage = imageElements[0];
    const imageWidth = sampleImage ? sampleImage.clientWidth : 100;

    const outer_radius = radius + imageWidth;
    const inner_radius = radius - imageWidth;

    return distance >= inner_radius && distance <= outer_radius;
  }

  function handlePopupMouseDown(current_photo: PopupPhotoProps) {
      global_current_photo = current_photo;
      visible = true; 
  }

  function handlePopupTouch (current_photo: PopupPhotoProps) {
      global_current_photo = current_photo;
      visible = true; 
  }


  function handleRingMouseMove(e: MouseEvent) {
    if (handleRingInteraction(e)) {
      is_hovering = true;
    } else {
      is_hovering = false;
    }

    if (is_dragging) handleMouseMove(e);
  }

  // Global event handlers for smooth dragging even when mouse leaves container
  function handleGlobalMouseMove(e: MouseEvent) {
    if (is_dragging) handleMouseMove(e);
  }

  function handleGlobalMouseUp() {
    handleMouseUp();
  }

  function handleGlobalTouchMove(e: TouchEvent) {
    if (is_dragging) handleTouchMove(e);
  }

  function handleGlobalTouchEnd() {
    handleTouchEnd();
  }

  onMount(() => {
    // Only run in browser environment
    if (!browser || typeof window === "undefined") return;

    // Add global listeners for smooth dragging
    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchmove", handleGlobalTouchMove, {
      passive: false,
    });
    window.addEventListener("touchend", handleGlobalTouchEnd);
  });

  onDestroy(() => {
    // Only run in browser environment
    if (!browser || typeof window === "undefined") return;

    // Clean up global listeners
    window.removeEventListener("mousemove", handleGlobalMouseMove);
    window.removeEventListener("mouseup", handleGlobalMouseUp);
    window.removeEventListener("touchmove", handleGlobalTouchMove);
    window.removeEventListener("touchend", handleGlobalTouchEnd);

    // Clean up animation frame
    if (
      animation_frame !== null &&
      typeof cancelAnimationFrame !== "undefined"
    ) {
      cancelAnimationFrame(animation_frame);
    }
  });

  function getImageStyle(index: number): string {
    // For initial positioning only - dynamic updates handled by updateImagePositions
    const baseAngle = index * angleStep;
    const angle = baseAngle + rotation;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    let opacity = 1;
    if (y > fadeStart) {
      opacity = Math.max(0, 1 - (y - fadeStart) / fadeEnd);
    }

    const scale = 0.7 + 0.3 * opacity;
    const tiltAngle = angle + 90;
    const zIndex = Math.floor(opacity * 100);
    const cursor = is_dragging ? "grabbing" : "grab";
    const pointerEvents = opacity > 0.1 ? "auto" : "none";

    return `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0) rotate(${tiltAngle}deg) scale(${scale});
      opacity: ${opacity};
      width: 6vw;
      height: 6vw;
      min-width: 100px;
      min-height: 100px;
      border-radius: 16px;
      overflow: hidden;
      cursor: ${cursor};
      z-index: ${zIndex};
      pointer-events: ${pointerEvents};
      will-change: transform, opacity;
    `
      .trim()
      .replace(/\s+/g, " ");
  }
</script>

<div class="w-full h-screen flex items-center justify-center">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={container}
    on:mousedown={handleMouseDown}
    on:mousemove={handleRingMouseMove}
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    class="relative w-full h-full flex items-center justify-center"
    style:cursor={is_dragging ? "grabbing" : "grab"}
  >
    {#each photos as photo, index}
      <div bind:this={imageElements[index]} 
      style={getImageStyle(index)}
      on:mousedown={() => handlePopupMouseDown(photo)}
      on:touchstart={() => handlePopupTouch(photo)}>
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

<!-- <PopupSlides isVisible={visible} current={global_current_photo}></PopupSlides> -->
