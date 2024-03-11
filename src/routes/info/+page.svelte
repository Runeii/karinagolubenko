<script>
	import content from '../../content/info.json';
</script>

<div class="bio">{@html content.bio}</div>
<ul class="tags">
	<li>UI/UX Design</li>
	<li>Service Design</li>
	<li>Concept Development</li>
</ul>

<style lang="postcss">
	.bio {
		@mixin heading4;
		margin-bottom: 44px;
		display: flex;
		flex-direction: column;
		gap: 0.5em;

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
		}
	}
</style>
