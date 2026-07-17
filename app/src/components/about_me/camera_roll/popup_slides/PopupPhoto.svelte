<script lang="ts">
  import type { PopupPhotoProps } from "../../../../types/about_me/photoProps.js";

  export let popUp: PopupPhotoProps;
</script>

<div
  class="flex flex-col items-center glass-morphism p-5 mb-4 rounded-3xl w-[22vw] h-[50vh]"
>
  <img
    src={popUp.src}
    alt={popUp.desc.header}
    class="popup_photo w-full h-2/3 object-cover rounded-3xl"
    loading="lazy"
    draggable="false"
  />
  {#if popUp.desc}
    <p class="desc text-2xl mt-3">
      {popUp.desc.header}
    </p>
    <p class="desc opacity-40 mb-2">
      {popUp.desc.date}
    </p>
    <p class="desc mt-1 mb-3">
      {popUp.desc.desc}
    </p>
  {/if}
</div>

<style>
  .popup_photo {
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  }

  .desc {
    align-self: start;
    color: white;
    font-size: calc(1vh + 0.5vw);
  }
</style>
