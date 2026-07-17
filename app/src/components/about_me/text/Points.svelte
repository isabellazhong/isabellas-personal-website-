<script lang="ts">
  import type { PointsProps } from "../../../types/about_me/pointsProps.js";
  import type { PhotoTag } from "../../../types/about_me/photoProps.js";

  export let currentTag: PhotoTag | undefined = undefined;
  const points: PointsProps[] = [
    {
      header: "EATING AND COOKING",
      desc: "Personally, I think food is the best use of my money",
      type: "food",
    },
    {
      header: "PAINTING",
      desc: "This is why I think frontend is fun lol",
      type: "art",
    },
    {
      header: "MY FRIENDS",
      desc: "Couldn't be the person I am today without them :)",
      type: "friends",
    },
  ];

  function getType(tag: PhotoTag): void {
    currentTag = tag;
  }
</script>

<ul class="m-10 ml-0 mt-0">
  {#each points as point}
    <li
      class="text-white flex pt-5 items-start hover:text-blue-200 on:click={() =>
        getType(point.type)}"
    >
      <h3><b>{point.header}</b></h3>
    </li>
    <p class="text-gray-300 self-start text-left">{point.desc}</p>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
  }

  li::before {
    content: "▶";
    margin-right: 10px;
    flex-shrink: 0;
  }
</style>
