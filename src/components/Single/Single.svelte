<script lang="ts">
	import Tag from '../Tags/Tags.svelte';
	import WideLayout from '../WideLayout/WideLayout.svelte';
	import Visual from '../Visual/Visual.svelte';
	import SinglePageData from '../../content/projects/project-bridal-forest.json';

	export let data: Omit<Omit<typeof SinglePageData, 'featuredMedia'>, 'blocks'> & {
		featuredMedia: MediaBlock;
		blocks: {
			text: {
				heading: string;
				text: string;
			};
			visuals: {
				media: MediaBlock;
				width: number;
				marginLeft: number;
				caption: string;
			}[];
		}[];
	};

	const getSizeofVisual = (visuals: { width: number }[], visual: { width: number }) => {
		const totalWidth = visuals.reduce((acc, curr) => acc + curr.width, 0);
		const percentage = (visual.width / totalWidth) * 100;
		return percentage;
	};
</script>

<WideLayout>
	<h1 class="title">{data.title}</h1>
	<p class="subtitle">{data.description}</p>
	<Visual class="featured--casestudy" visual={data.featuredMedia} size={100} />
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
			{#if block.text && (block.text.heading || block.text.text)}
				<div class="text">
					{#if block.text.heading}
						<h2>{block.text.heading}</h2>
					{/if}
					{#if block.text.text}
						<p>{block.text.text}</p>
					{/if}
				</div>
			{/if}
			{#if block.visuals.filter((visual) => visual.media).length > 0}
				<div class={`visuals ${block.visuals.length > 3 && 'hasMany'}`}>
					{#each block.visuals.filter((visual) => visual.media) as visual}
						<div
							class="single-visual"
							style={`--visual-width: ${visual.width}; --margin-left: ${visual.marginLeft}`}
						>
							<Visual
								size={getSizeofVisual(
									block.visuals.filter((visual) => visual.media),
									visual
								)}
								visual={visual.media}
							/>
							{#if visual.caption}
								<p>{visual.caption}</p>
							{/if}
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
		margin: 0 auto;
		padding: 0;
		width: 100%;
		@media (min-width: 720px) {
			@mixin heading1;
			width: 82%;
		}
	}
	.subtitle {
		@mixin body3;
		color: var(--dark-grey);
		margin: 0 auto 16px;
		padding: 0;
		width: 100%;

		@media (min-width: 720px) {
			@mixin body1;
			margin-bottom: 52px;
			width: 82%;
		}
	}

	:global(.featured--casestudy) {
		width: 100%;
		height: auto;
		margin-bottom: 16px;
		view-transition-name: card-expand;

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

	.visuals {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 56px;
		column-gap: 16px;

		@media (min-width: 720px) {
			margin-bottom: 72px;
		}

		+ .visuals {
			margin-top: -40px;

			@media (min-width: 720px) {
				margin-top: -56px;
			}
		}

		.single-visual {
			--visual-width: 100;
			--margin-left: 0;
			width: 100%;
			height: auto;

			@media (min-width: 720px) {
				--margin-base-unit: ((100vw - 80px) / 100);
				width: calc(var(--visual-width) * 1%);
				margin-left: calc(var(--margin-left) * var(--margin-base-unit));
			}

			@media (min-width: 1520px) {
				--margin-base-unit: (1440px / 100);
			}
		}

		@media (max-width: 720px) {
			&.hasMany {
				overflow-x: auto;
				.single-visual {
					min-width: 45%;
				}
			}
		}

		p {
			@mixin body4;
			padding: 0;
			margin: 8px 0 0;
		}
	}
</style>
