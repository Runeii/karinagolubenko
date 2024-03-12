<script>
	import Card from '../../components/Cards/Card/Card.svelte';
	import Cards from '../../components/Cards/Cards.svelte';
	import NarrowLayout from '../../components/NarrowLayout/NarrowLayout.svelte';

	const projects = [
		{
			title: 'Store of the Future',
			image: 'https://via.placeholder.com/342',
			description: 'In-store digital selling platform',
			slug: '/store-of-the-future'
		},
		{
			title: 'Store of the Future',
			image: 'https://via.placeholder.com/342',
			description: 'In-store digital selling platform',
			slug: '/store-of-the-future'
		},
		{
			title: 'Store of the Future',
			image: 'https://via.placeholder.com/342',
			description: 'In-store digital selling platform',
			slug: '/store-of-the-future'
		},
		{
			title: 'Store of the Future',
			image: 'https://via.placeholder.com/342',
			description: 'In-store digital selling platform',
			slug: '/store-of-the-future'
		}
	];
</script>

<NarrowLayout>
	<Cards {projects} />
</NarrowLayout>

<style lang="postcss">
	.projects {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
</style>
