<script lang="ts">
	import type { PageData } from '$types';
	import Cards from '../components/Cards/Cards.svelte';
	import NarrowLayout from '../components/NarrowLayout/NarrowLayout.svelte';

	export let data: PageData;
	const trimmedIntro = data.content.intro.trim();
</script>

<NarrowLayout>
	{#if trimmedIntro}
		<p class="intro">
			{trimmedIntro}
		</p>
	{/if}
	<Cards projects={data.projects} />
</NarrowLayout>

<style lang="postcss">
	.intro {
		@mixin heading4;
		text-align: center;
		margin-bottom: 52px;
		padding: 0 12px;

		@media (min-width: 720px) {
			@mixin heading3;
			margin-bottom: 80px;
		}
	}
</style>
