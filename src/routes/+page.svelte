<script>
	import Card from '../components/Card/Card.svelte';
	import content from '../content/homepage.json';
</script>

<p class="intro">
	{content.intro}
</p>
<div class="projects">
	<Card
		title="Store of the Future"
		image="https://via.placeholder.com/342"
		description="In-store digital selling platform"
		slug="/store-of-the-future"
	/>

	<Card
		title="Store of the Future"
		image="https://via.placeholder.com/342"
		description="In-store digital selling platform"
		slug="/store-of-the-future"
	/>

	<Card
		title="Store of the Future"
		image="https://via.placeholder.com/342"
		description="In-store digital selling platform"
		slug="/store-of-the-future"
	/>

	<Card
		title="Store of the Future"
		image="https://via.placeholder.com/342"
		description="In-store digital selling platform"
		slug="/store-of-the-future"
	/>
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
