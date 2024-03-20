<script lang="ts">
	import { onMount } from 'svelte';

	export let title: string;
	export let image: string;
	export let description: string;
	export let slug: string;
	export let isPrivate: boolean;

	let imageSrc = image.replace('static/', '');
</script>

<a href={slug} class="link">
	<article class={`card ${isPrivate && 'isPrivate'}`}>
		<img src={imageSrc} alt={title} class="image" />
		<h1 class="title">{title}</h1>
		<p class="description">{description}</p>
	</article>
</a>

<style lang="postcss">
	.link {
		text-decoration: none;
		color: inherit;
	}
	.card {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.image {
		aspect-ratio: 342 / 192;
		object-fit: cover;
		object-position: center center;
		margin-bottom: 16px;

		@media (min-width: 720px) {
			margin-bottom: 32px;
		}
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
