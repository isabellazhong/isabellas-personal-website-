<script lang="ts">
    import type { photoProps, PopupPhotoProps } from "../../../../types/about_me/photoProps.js";
    import PopupPhoto from "./PopupPhoto.svelte";

    export let current: PopupPhotoProps;
    export let isVisible: boolean;
    
    function goForward() {
        if(current.next_photo) current = current.next_photo; 
    }

    function goBackward() {
        if(current.prev_photo) current = current.prev_photo; 
    }
</script>

<div class={`${isVisible ? 'visible' : 'invisible'} w-full h-full absolute -top-1/2 flex justify-center`}>
    <button type="button" class="left-button text-white" on:click={goBackward}>l</button>
    <PopupPhoto popUp={current}></PopupPhoto>
    <button type="button" class="right-button" on:click={goForward}>r</button>
</div>