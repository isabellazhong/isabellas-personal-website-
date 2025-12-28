<script lang="ts">
  export let targetElementID: string;
  export let buttonText: string;

  function jumpToPage() {
    const targetElement: HTMLElement | null =
      document.getElementById(targetElementID);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<button
  on:click={jumpToPage}
  class="w-[20vw] h-4/5 text-white bg-transparent"
>
  {buttonText}
</button>
