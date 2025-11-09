<script lang="ts">
  import CameraRoll from "../camera_roll/CameraRoll.svelte";
  import ActivityPoints from "./Points.svelte";
  import type { PhotoTag } from "../../../types/about_me/photoProps.js";
  import CameraRoll2 from "../camera_roll/CameraRoll2.svelte";

  export let about_me_desc: string = `
        I'm currently a second year student studying <strong>Computer Science 
        and Cognitive Science</strong> double major at <strong>UoFT</strong> :) 
        <br><br>
        I <strong>love:</strong> 
        
    `;
</script>


<div
  class="absolute w-1/2 h-1/2justify-center align-middle flex-col p-30 text-center"
  >
  <h1 class="text-white sm:text-4xl font-bold">a bit more about me...</h1>
  <div>
    <p class="text-white mt-10">{@html about_me_desc}</p>
    <div class="flex items-center justify-center">
      <ActivityPoints></ActivityPoints>
    </div>
  </div>
</div>

