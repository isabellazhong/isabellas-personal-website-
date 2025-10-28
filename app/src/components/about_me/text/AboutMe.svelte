<script lang="ts">
  import ActivityPoints from "./ActivityPoints.svelte";
  export let about_me_desc: string = `
        I'm currently a second year student studying <strong>Computer Science 
        and Cognitive Science</strong> double major at <strong>UoFT</strong> :) 
        <br><br>
        I <strong>LOVE:</strong>
        
    `;
</script>

<div
  class="relative h-screen w-screen justify-center align-middle flex-col mt-10 p-30"
>
  <h1 class="text-white sm:text-4xl font-bold">a bit more about me...</h1>
  <div class="w-full">
    <p class="text-white mt-10">{@html about_me_desc}</p>
    <div class="justify-center align-middle"> 
      <ActivityPoints></ActivityPoints>
    </div>
  </div>
</div>
