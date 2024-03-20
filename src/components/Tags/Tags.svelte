<script>
	export let tags;
</script>

<ul class={`tags ${$$restProps.class ?? ''}`}>
	{#each tags as tag}
		<li class="tag">{tag}</li>
	{/each}
</ul>

<style lang="postcss">
	.tags {
		display: flex;
		flex-direction: row;
		gap: 8px;
		margin: 0;
		padding: 0;
		flex-wrap: wrap;
	}
	.tag {
		@mixin body4;
		width: auto;
		padding: 10px;
		border-radius: 24px;
		list-style: none;
		display: block;
		background-color: var(--light-grey);

		@media (min-width: 720px) {
			@mixin body3;
		}
	}
</style>
