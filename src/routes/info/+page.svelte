<script>
	import NarrowLayout from '../../components/NarrowLayout/NarrowLayout.svelte';
	import Tags from '../../components/Tags/Tags.svelte';
	import Tag from '../../components/Tags/Tags.svelte';
	import content from '../../content/info.json';
</script>

<NarrowLayout>
	<div class="bio">{@html content.bio}</div>
	<Tags tags={content.tags} />
</NarrowLayout>

<style lang="postcss">
	.bio {
		@mixin heading4;
		margin-bottom: 44px;
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		@media (min-width: 720px) {
			@mixin heading3;
			margin-bottom: 62px;
		}

		:global(p) {
			margin: 0;
			padding: 0;
		}
	}
</style>
