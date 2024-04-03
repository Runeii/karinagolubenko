<script lang="ts">
	import Visual from '../../Visual/Visual.svelte';
	import PrivateImage from '../../PrivateImage/PrivateImage.svelte';
	import { onNavigate } from '$app/navigation';

	export let title: string;
	export let visual: MediaBlock;
	export let description: string;
	export let slug: string;
	export let isPrivate: boolean;
	export let order: number = 0;

	let isClicked = false;
	const handleClick = () => {
		isClicked = true;
	};

	onNavigate((navigation) => {
		if (!document.startViewTransition || !isClicked) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<a
	href={slug}
	class={`link ${isClicked && 'isClicked'}`}
	on:click={handleClick}
	style={`order: ${order}`}
>
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
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	:root::view-transition-old(root) {
		animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
	}

	:root::view-transition-new(root) {
		animation: 500ms ease-out 500ms both fade-in;
	}
	.link {
		text-decoration: none;
		transform-origin: top center;
		color: inherit;

		&.isClicked {
			view-transition-name: card-expand;
		}

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
