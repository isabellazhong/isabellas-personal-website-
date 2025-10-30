<script lang="ts">
  import CameraRoll from "./camera_roll/CameraRoll.svelte";
  import ActivityPoints from "./text/Points.svelte";
  export let about_me_desc: string = `
        I'm currently a second year student studying <strong>Computer Science 
        and Cognitive Science</strong> double major at <strong>UoFT</strong> :) 
        <br><br>
        I <strong>love:</strong>
        
    `;
</script>

<div>
  <div
    class="relative h-1/2 w-screen justify-center align-middle flex-col mt-10 p-30"
  >
    <h1 class="text-white sm:text-4xl font-bold">a bit more about me...</h1>
    <div>
      <p class="text-white mt-10">{@html about_me_desc}</p>
      <div class="flex items-center justify-center">
        <ActivityPoints></ActivityPoints>
      </div>
    </div>
  </div>
  <div
    class="relative h-1/2 w-screen justify-center align-middle -translate-y-50"
  >
    <CameraRoll></CameraRoll>
  </div>
</div>
