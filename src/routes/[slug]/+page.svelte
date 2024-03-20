<script lang="ts">
	import type { PageData } from '$types';
	import Tag from '../../components/Tags/Tags.svelte';
	import WideLayout from '../../components/WideLayout/WideLayout.svelte';

	export let data: PageData;
</script>

<WideLayout>
	<h1 class="title">{data.title}</h1>
	<p class="subtitle">{data.description}</p>
	<img class="image" src={data.image} alt={data.title} />
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
						<img src={image.image} alt="" style={`--image-width: ${image.width}`} />
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
		margin-bottom: 28px;
		@media (min-width: 720px) {
			margin-bottom: 44px;
		}
	}

	.meta {
		@mixin body4;
		display: grid;
		grid-template-columns: 16% 25% 9% 50%;
		row-gap: 24px;
		margin: 0 0 56px;
		@media (min-width: 720px) {
			@mixin body3;
			margin-bottom: 82px;
		}

		dt {
			color: var(--dark-grey);
		}

		dd {
			padding: 0;
			margin: 0;
		}
		:global(.tags) {
			grid-column: 4 / 5;
		}
	}

	.lede {
		@mixin heading4;
		margin: 0 auto 56px;
		width: 82%;

		@media (min-width: 720px) {
			@mixin heading2;
			margin-bottom: 72px;
		}
	}

	.text {
		margin-bottom: 80px;
		width: 40%;

		@media (min-width: 720px) {
			margin-left: 40%;
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
		margin-bottom: 72px;

		img {
			--image-width: 100;
			width: calc(var(--image-width) * 1%);
		}
	}
</style>
