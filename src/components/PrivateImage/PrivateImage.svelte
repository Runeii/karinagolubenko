<script lang="ts">
	import { onMount } from 'svelte';
	import { drawPixellatedImage } from './utils';

	export let visual: MediaBlock;
	export let alt: string;
	let canvasEl: HTMLCanvasElement;
	let imageEl: HTMLImageElement;
	let isProcessed = false;

	const handleImageLoad = async () => {
		const ctx = canvasEl.getContext('2d');
		const image = imageEl;
		canvasEl.style.width = '100%';
		canvasEl.style.aspectRatio = `${image.width} / ${image.height}`;
		canvasEl.width = image.width;
		canvasEl.height = image.height;
		isProcessed = true;
		if (!ctx) {
			return;
		}
		ctx.imageSmoothingEnabled = false;

		let raf;
		const handleTick = () => {
			drawPixellatedImage(image, canvasEl, 40 + 40 * Math.abs(Math.cos(Date.now())));
			raf = window.setTimeout(handleTick, 500);
		};
		handleTick();
	};

	onMount(() => {
		if (imageEl.complete) {
			handleImageLoad();
		}
	});
</script>

<div class={`${$$restProps.class} ${isProcessed && 'isProcessed'}`}>
	{#if visual.image}
		<canvas bind:this={canvasEl} />
		{#if !isProcessed}
			<enhanced:img src={visual.image} {alt} bind:this={imageEl} on:load={handleImageLoad} />
		{/if}
	{/if}
</div>

<style lang="postcss">
	img {
		width: 100%;
		height: auto;
	}
</style>
