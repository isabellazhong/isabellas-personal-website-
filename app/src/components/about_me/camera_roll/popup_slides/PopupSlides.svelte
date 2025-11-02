<script lang="ts">
  import type { photoProps, PopupPhotoProps } from "../../../../types/about_me/photoProps.js";
  import PopupPhoto from "./PopupPhoto.svelte";

    let current: PopupPhotoProps;
    
    function goForward() {
       current = current.next_photo; 
    }

    function goBackward() {
        current = current.prev_photo; 
    }
</script>

<div>
    <div class="left-button"></div>
    <PopupPhoto popUp={current}></PopupPhoto>
    <div class="right-button"></div>
</div>