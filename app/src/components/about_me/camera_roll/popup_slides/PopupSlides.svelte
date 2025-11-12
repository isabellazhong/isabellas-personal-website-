<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { fade, scale } from "svelte/transition";
  import type { PopupPhotoProps } from "../../../../types/about_me/photoProps.js";
  import PopupPhoto from "./PopupPhoto.svelte";
  import { browser } from "$app/environment";

  export let current: PopupPhotoProps;
  export let isVisible: boolean;

  const dispatch = createEventDispatcher<{ close: void }>();

  function goForward() {
    if (current?.next_photo) current = current.next_photo;
  }

  function goBackward() {
    if (current?.prev_photo) current = current.prev_photo;
  }

  function close() {
    dispatch("close");
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
    class="absolute w-full h-full inset-0 z-50 flex items-center justify-center -top-1/2"
    on:touchstart={onTouchStart}
    on:touchend={onTouchEnd}
  >
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/70 backdrop-blur-[1px]"
      on:click={close}
      transition:fade
    ></div>

    <!-- Modal content -->
    <div
      class="relative z-10 mx-4 flex w-full max-w-5xl items-center justify-center"
      transition:scale={{ duration: 150 }}
    >
      <!-- Prev button -->
      <button
        type="button"
        aria-label="Previous image"
        class="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus:outline-none"
        on:click={goBackward}
      >
        <!-- left chevron -->
        <div
          class="w-0 h-0 border-t-[6px] border-t-transparent border-r-8 border-r-white border-b-[6px] border-b-transparent"
        ></div>
      </button>

      <!-- Image and caption -->
      <div class="mx-3 max-w-full">
        <PopupPhoto popUp={current} />
      </div>

      <!-- Next button -->
      <button
        type="button"
        aria-label="Next image"
        class="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus:outline-none"
        on:click={goForward}
      >
        <!-- right chevron -->
        <div
          class="w-0 h-0 border-t-[6px] border-t-transparent border-l-8 border-l-white border-b-[6px] border-b-transparent"
        ></div>
      </button>
    </div>
  </div>
{/if}
