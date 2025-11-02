<script lang="ts">
    import type { PopupPhotoProps } from "../../../../types/about_me/photoProps.js";

    export let popUp: PopupPhotoProps; 
</script>

<div>
    <img src={popUp.src} alt={popUp.desc} id={`photo-${popUp.src}`}>
    <p>{popUp.desc}</p>
</div>