<script lang="ts">
  import type { PopupPhotoProps } from "../../../../types/about_me/photoProps.js";

  export let popUp: PopupPhotoProps;
</script>

<div class="flex flex-col items-center">
  <img
    src={popUp.src}
    alt={popUp.desc}
    class="max-h-[80vh] max-w-[90vw] sm:max-w-[80vw] object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
    loading="lazy"
    draggable="false"
  />
  {#if popUp.desc}
    <p class="mt-3 px-3 text-center text-sm sm:text-base text-white/90">
      {popUp.desc}
    </p>
  {/if}
</div>
