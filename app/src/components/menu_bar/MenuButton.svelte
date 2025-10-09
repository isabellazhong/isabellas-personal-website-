<script lang="ts">
    export let targetElementID:string; 
    export let buttonText:string;

    function jumpToPage() {
        const targetElement: HTMLElement | null = document.getElementById(targetElementID); 
        if (targetElement) {
            targetElement.scrollIntoView({behavior: 'smooth'}); 
        }
    }
</script>

<button on:click={jumpToPage}>
    {buttonText}
</button>

<style>
    button {
        width: 20vw;
        height: 80%;
        border-color: aliceblue;
        color: #ffff;
        background-color: transparent;
        border-radius: 20px;
        padding: 10px;
    }
</style>