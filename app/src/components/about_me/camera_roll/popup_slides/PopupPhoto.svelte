<script lang="ts">
  import type { PopupPhotoProps } from "../../../../types/about_me/photoProps.js";

  export let popUp: PopupPhotoProps;
</script>

<div
  class="flex flex-col items-center glass_morphism p-5 rounded-3xl w-[60vh] h-[80vh]"
>
  <img
    src={popUp.src}
    alt={popUp.desc.header}
    class="popup_photo w-full h-3/4 object-cover rounded-3xl"
    loading="lazy"
    draggable="false"
  />
  {#if popUp.desc}
    <p class="desc text-[25px] mt-3">
      {popUp.desc.header}
    </p>
    <p class="desc opacity-40">
      {popUp.desc.date}
    </p>
    <p class="desc mt-4 ">
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
  }
</style>
