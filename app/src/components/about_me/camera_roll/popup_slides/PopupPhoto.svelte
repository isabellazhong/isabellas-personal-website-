<script lang="ts">
    import type { PopupPhotoProps } from "../../../../types/about_me/photoProps.js";

    export let popUp: PopupPhotoProps; 
</script>

<div class="image">
    <img src={popUp.src} alt={popUp.desc}>
    <p>{popUp.desc}</p>
</div>

<style>
    .image {
        width: 70%; 
    }
</style>