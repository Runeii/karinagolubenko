<script lang="ts">
	import type { PageData } from '$types';
	import { onMount } from 'svelte';
	import Tag from '../../components/Tags/Tags.svelte';
	import WideLayout from '../../components/WideLayout/WideLayout.svelte';

	export let data: PageData;
</script>

<WideLayout>
	<h1 class="title">{data.title}</h1>
	<p class="subtitle">{data.description}</p>
	<enhanced:img
		class="image"
		src={data.image}
		alt={data.title}
		sizes="(min-width:1440px) 1440px, 100vw"
	/>
	<dl class="meta">
		<div class="year">
			<dt>Year</dt>
			<dd>{data.year}</dd>
		</div>

		<div class="credits">
			<dt>Credits</dt>
			<dd>{data.credits}</dd>
		</div>
		{#if data.tags}
			<Tag class="tags" tags={data.tags} />
		{/if}
	</dl>
	<p class="lede">{data.lede}</p>
	{#if data.blocks}
		{#each data.blocks as block}
			{#if block.text.heading || block.text.text}
				<div class="text">
					{#if block.text.heading}
						<h2>{block.text.heading}</h2>
					{/if}
					{#if block.text.text}
						<p>{block.text.text}</p>
					{/if}
				</div>
			{/if}
			{#if block.images.filter((image) => image.image).length > 0}
				<div class="images">
					{#each block.images as image}
						<div class="single-image" style={`--image-width: ${image.width}`}>
							<enhanced:img src={image.image} alt="" />
						</div>
					{/each}
				</div>
			{/if}
		{/each}
	{/if}
</WideLayout>

<style lang="postcss">
	.title {
		@mixin heading3;
		color: var(--black);
		margin: 0;
		padding: 0;
		width: 100%;
		@media (min-width: 720px) {
			@mixin heading1;
		}
	}
	.subtitle {
		@mixin body3;
		color: var(--dark-grey);
		margin: 0 0 16px;
		padding: 0;

		@media (min-width: 720px) {
			@mixin body1;
			margin-bottom: 52px;
		}
	}

	.image {
		width: 100%;
		height: auto;
		margin-bottom: 16px;

		@media (min-width: 720px) {
			margin-bottom: 44px;
		}
	}

	.meta {
		@mixin body4;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas:
			'year credits'
			'tags tags';
		row-gap: 24px;
		margin: 0 0 56px;

		@media (min-width: 720px) {
			@mixin body3;
			grid-template-columns: 16% 25% 9% 50%;
			grid-template-areas: 'year credits . tags';
			margin-bottom: 82px;
		}

		dt {
			color: var(--dark-grey);
		}

		dd {
			padding: 0;
			margin: 0;
		}
		.year {
			grid-area: year;
		}
		.credits {
			grid-area: credits;
		}
		:global(.tags) {
			grid-area: tags;
		}
	}

	.lede {
		@mixin heading4;
		margin: 0 auto 56px;
		width: 100%;

		@media (min-width: 720px) {
			@mixin heading2;
			width: 82%;
			margin-bottom: 72px;
		}
	}

	.text {
		margin-bottom: 56px;
		width: 100%;

		@media (min-width: 720px) {
			margin-left: 40%;
			margin-bottom: 80px;
			width: 40%;
		}

		h2 {
			@mixin heading4;
			margin: 0 0 12px;
			padding: 0;
		}
		p {
			@mixin body3;
			margin: 0;
			padding: 0;
		}
	}

	.images {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-bottom: 56px;
		@media (min-width: 720px) {
			margin-bottom: 72px;
		}

		.single-image {
			--image-width: 100;
			width: 100%;
			height: auto;
			@media (min-width: 720px) {
				width: calc(var(--image-width) * 1%);
			}
		}

		img {
			width: 100%;
			height: auto;
		}
	}
</style>
