<script lang="ts">
	import { onMount } from 'svelte';
	import Visual from '../../Visual/Visual.svelte';
	import PrivateImage from '../../PrivateImage/PrivateImage.svelte';

	export let title: string;
	export let visual: MediaBlock;
	export let description: string;
	export let slug: string;
	export let isPrivate: boolean;
	export let order: number = 0;
</script>

<a href={slug} class="link" style={`order: ${order}`}>
	<article class={`card ${isPrivate && 'isPrivate'}`}>
		{#if visual}
			{#if isPrivate}
				<PrivateImage {visual} alt={title} class="image" />
			{:else}
				<Visual {visual} alt={title} class="image" />
			{/if}
		{/if}
		<h1 class="title">{title}</h1>
		<p class="description">{description}</p>
	</article>
</a>

<style lang="postcss">
	@keyframes expand-out {
		to {
			--start-width: 928;
			--end-width: 1440;
			scale: calc(var(--end-width) / var(--start-width));
		}
	}

	:root::view-transition-old(card-expand) {
		animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both expand-out;
		transform-origin: top center;
	}

	.link {
		text-decoration: none;
		color: inherit;

		:global(.image) {
			margin-bottom: 16px;
			height: auto;
			width: 100%;

			@media (min-width: 720px) {
				margin-bottom: 32px;
			}
		}
	}
	.card {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.title {
		@mixin heading4;
		margin: 0;
		padding: 0;
		@media (min-width: 720px) {
			@mixin heading3;
		}
	}
	.description {
		@mixin body3;
		margin: 0;
		padding: 0;
		color: var(--dark-grey);

		@media (min-width: 720px) {
			@mixin body2;
		}
	}
</style>
