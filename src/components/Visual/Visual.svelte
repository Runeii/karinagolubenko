<script lang="ts">
	import Video from '../Video/Video.svelte';

	export let visual: MediaBlock;
	export let alt: string | undefined = undefined;
</script>

{#if visual?.video?.guid}
	<Video {alt} class={`video ${$$restProps.class ?? ''}`} video={visual.video} />
{:else if visual?.image}
	<enhanced:img
		class={`image ${$$restProps.class ?? ''}`}
		src={visual.image}
		{alt}
		sizes="(min-width:1440px) 1440px, 100vw"
	/>
{/if}

<style lang="poscss">
	.image {
		width: 100%;
		height: auto;
	}
</style>
