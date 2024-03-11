<script>
	import content from '../../content/info.json';
</script>

<div class="bio">{@html content.bio}</div>
<ul class="tags">
	{#each content.tags as tag}
		<li>{tag}</li>
	{/each}
</ul>

<style lang="postcss">
	.bio {
		@mixin heading4;
		margin-bottom: 44px;
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		@media (min-width: 720px) {
			@mixin heading3;
		}

		:global(p) {
			margin: 0;
			padding: 0;
		}
	}
	.tags {
		display: flex;
		flex-direction: row;
		gap: 8px;
		margin: 0;
		padding: 0;
		flex-wrap: wrap;

		li {
			@mixin body4;
			display: block;
			width: auto;
			padding: 10px;
			border-radius: 24px;
			list-style: none;
			background-color: var(--light-grey);

			@media (min-width: 720px) {
				@mixin body3;
			}
		}
	}
</style>
