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
		<Tag class="tags" tags={data.tags} />
	</dl>
	<p class="lede">{data.lede}</p>
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
	}

	.meta {
		@mixin body4;
		display: grid;
		grid-template-columns: 45% 55%;
		row-gap: 24px;
		margin-bottom: 56px;

		@media (min-width: 720px) {
			@mixin body3;
			margin-bottom: 66px;
		}

		dt {
			color: var(--dark-grey);
		}

		dd {
			padding: 0;
			margin: 0;
		}
		:global(.tags) {
			grid-column: 1 / 3;
		}
	}

	.lede {
		@mixin heading4;
		margin-bottom: 56px;

		@media (min-width: 720px) {
			@mixin heading2;
			margin-bottom: 72px;
		}
	}
</style>
