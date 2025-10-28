<script lang="ts">
    import type { ActivityPointProps } from "../../../types/about_me/activityPointsProps.js";
    let props:ActivityPointProps;
    const points:ActivityPointProps[] = [
        {header: "EATING AND COOKING", desc: "Personally, I think food is the best use of my money"},
        {header: "PAINTING", desc: "This is why I think frontend is fun lol"},
        {header: "MY FRIENDS", desc: "Couldn't be the person I am today without them :)"}
    ]
</script>

<ul class="m-10 ml-0 mt-0 translate-x-1/4">
    {#each points as point}
        <li class="text-white flex pt-5 items-start hover:text-blue-200">
            <h3><b>{point.header}</b></h3>
        </li>
        <p class="text-white">{point.desc}</p>
    {/each}
</ul>

<style>
    ul {
        list-style:none;
    }

    li::before {
        content: "▶";
        margin-right: 10px;
        flex-shrink: 0;
    }
</style>