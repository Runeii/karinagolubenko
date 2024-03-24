<script lang="ts">
	import { onMount } from 'svelte';
	import Visual from '../../Visual/Visual.svelte';

	export let title: string;
	export let visual: MediaBlock | string;
	export let description: string;
	export let slug: string;
	export let isPrivate: boolean;
</script>

<a href={slug} class="link">
	<article class={`card ${isPrivate && 'isPrivate'}`}>
		{#if typeof visual === 'string'}
			<img src={visual.replace('static/', '')} alt={title} class="image" />
		{:else}
			<Visual {visual} alt={title} class="image" />
		{/if}
		<h1 class="title">{title}</h1>
		<p class="description">{description}</p>
	</article>
</a>

<style lang="postcss">
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
