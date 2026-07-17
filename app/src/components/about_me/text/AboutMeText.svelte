<script lang="ts">
  import ActivityPoints from "./Points.svelte";

  export let about_me_desc: string = `
        I'm currently a second year student studying <strong>Computer Science 
        and Cognitive Science</strong> double major at <strong>UofT</strong> :) 
        <br><br>
        I <strong>love:</strong> 
        
    `;
</script>


<div
  class="absolute w-3/5 h-1/2 justify-center align-middle flex-col p-30 pt-0 text-center"
  >
  <h1 class="text-white sm:text-4xl font-bold">a bit more about me...</h1>
  <div>
    <p class="text-white mt-10">{@html about_me_desc}</p>
    <div class="flex items-center justify-center">
      <ActivityPoints></ActivityPoints>
    </div>
  </div>
</div>

