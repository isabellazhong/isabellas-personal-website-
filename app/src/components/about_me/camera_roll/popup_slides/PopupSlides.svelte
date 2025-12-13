<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { scale, fade } from "svelte/transition";
  import type { PopupPhotoProps } from "../../../../types/about_me/photoProps.js";
  import PopupPhoto from "./PopupPhoto.svelte";
  import { browser } from "$app/environment";

  export let current: PopupPhotoProps;
  export let isVisible: boolean;

  function goForward() {
    if (current?.next_photo) current = current.next_photo;
  }

  function goBackward() {
    if (current?.prev_photo) current = current.prev_photo;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!isVisible) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowRight") {
      goForward();
    } else if (event.key === "ArrowLeft") {
      goBackward();
    }
  }

  onMount(() => {
    if (!browser) return;
    window.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener("keydown", handleKeyDown);
  });

  let startX: number | null = null;
  function onTouchStart(e: TouchEvent) {
    startX = e.touches?.[0]?.clientX ?? null;
  }
  function onTouchEnd(e: TouchEvent) {
    if (startX === null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? startX;
    const deltaX = endX - startX;
    const threshold = 40; // swipe threshold in px
    if (deltaX > threshold) {
      goBackward();
    } else if (deltaX < -threshold) {
      goForward();
    }
    startX = null;
  }
</script>

{#if isVisible}
  <div
    class="absolute w-screen flex items-center justify-center perspective-[900px] z-100000"
    on:touchstart={onTouchStart}
    on:touchend={onTouchEnd}
  >
    <div
      class="absolute w-screen h-screen inset-0 bg-black/70 backdrop-blur-[7px]"
      transition:fade
    ></div>

    <div
      class="relative z-1000 flex w-full max-w-5xl items-center justify-center transform-3d translate-y-1/2 overflow-visible"
      transition:scale={{ duration: 150 }}
    >

      <div class="relative transform-3d flex -m-20" 
      aria-label="left-photo-wrapper"
      role="button"
      tabindex="0"
      on:click={goBackward}
      on:keydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goBackward();
        }}}>

        <div class="opacity-60 transform-gpu rotate-y-[-20deg] angled_photo_right">
          <PopupPhoto popUp={current.prev_photo!} />
        </div>

      </div>
      <div class="max-w-full transform-gpu">
        <PopupPhoto popUp={current} />
      </div>
 
      <div
      class="relative transform-3d flex -m-20" 
      aria-label="right-photo-wrapper"
      role="button"
      tabindex="0"
      on:click={goForward}
      on:keydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goForward();
        }
      }}
    >
      <div class="opacity-60 transform-gpu -rotate-y-[-20deg] angled_photo_left">
        <PopupPhoto popUp={current.next_photo!} />
      </div>
    </div>

    </div>
  </div>
{/if}

<style>
  .angled_photo_right {
    mask-image: linear-gradient(to right, black 10%, transparent 100%);
  }

  .angled_photo_left {
    mask-image: linear-gradient(to left, black 10%, transparent 100%);
  }
</style>
