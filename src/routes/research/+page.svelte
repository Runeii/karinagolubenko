<script lang="ts">
	import type { PageData } from '$types';
	import Cards from '../../components/Cards/Cards.svelte';
	import NarrowLayout from '../../components/NarrowLayout/NarrowLayout.svelte';
	export let data: PageData;
</script>

<NarrowLayout>
	<Cards projects={data.research} />
</NarrowLayout>

<style lang="postcss">
	.projects {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
</style>
