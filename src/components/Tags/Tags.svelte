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
		padding: 10px 16px 9px;
		line-height: 1;
		border-radius: 60px;
		list-style: none;
		display: block;
		background-color: var(--light-grey);

		@media (min-width: 720px) {
			@mixin body3;
		}
	}
</style>
