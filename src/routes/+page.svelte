<script lang="ts">
	import Card from '../components/Card/Card.svelte';
	import type { PageData } from '$types';

	export let data: PageData;
</script>

<p class="intro">
	{data.content.intro}
</p>
<div class="projects">
	{#each data.projects as project, key}
		<Card
			title={project.title}
			image={project.image}
			description={project.description}
			slug={`/projects/${project.slug}`}
		/>
	{/each}
</div>

<style lang="postcss">
	.intro {
		@mixin heading4;
		text-align: center;
		margin-bottom: 52px;
		padding: 0 12px;
	}
	.projects {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
</style>
