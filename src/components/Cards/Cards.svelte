<script>
	import Card from './Card/Card.svelte';

	export let projects;
</script>

<div class="cards">
	{#each projects as project, key}
		<Card
			title={project.title}
			image={project.image}
			description={project.description}
			slug={`/projects/${project.slug}`}
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
