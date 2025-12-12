<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {scale } from "svelte/transition";
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
    <div class="opacity-25 z-300"></div>

    <div
      class="relative z-10 flex w-full max-w-5xl items-center justify-center transform-3d"
      transition:scale={{ duration: 150 }}
    >
      <div class="max-w-full opacity-60 transform-gpu rotate-y-[-20deg] angled_photo_right">
        <PopupPhoto popUp={current.prev_photo!} />
      </div>

      <div class="-m-20 max-w-full transform-gpu">
        <PopupPhoto popUp={current} />
      </div>

      <div class="max-w-full opacity-60 transform-gpu -rotate-y-[-20deg] angled_photo_left">
        <PopupPhoto popUp={current.next_photo!} />
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

