<script lang="ts">
	import Card from './Card/Card.svelte';

	export let projects: Project[];
</script>

<div class="cards">
	{#each projects as project, key}
		<Card
			isPrivate={project.isPrivate}
			title={project.title}
			visual={project.featuredMedia}
			description={project.description}
			slug={project.slug}
			order={project.order}
		/>
	{/each}
</div>

<style lang="postcss">
	.cards {
		display: flex;
		flex-direction: column;
		gap: 32px;

		@media (min-width: 720px) {
			gap: 80px;
		}
	}
</style>
