<script lang="ts">
	import Video from '../Video/Video.svelte';

	export let visual: MediaBlock;
	export let alt: string | undefined = undefined;
	export let size: number = 100;

	const largeSize = (1440 / 100) * size;
</script>

{#if visual?.video?.guid}
	<Video {alt} class={`video ${$$restProps.class ?? ''}`} video={visual.video} />
{:else if visual?.image?.sources}
	<enhanced:img
		class={`image ${$$restProps.class ?? ''}`}
		src={visual.image}
		{alt}
		sizes="(min-width:1440px) {largeSize}px, 100vw"
	/>
{:else if visual?.imageUrl}
	<img
		class={`image ${$$restProps.class ?? ''}`}
		src={visual.imageUrl}
		{alt}
		sizes="(min-width:1440px) {largeSize}px, 100vw"
	/>
{/if}

<style lang="poscss">
	.image {
		width: 100%;
		height: auto;
	}
</style>
