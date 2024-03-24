<script lang="ts">
	import type { PageData } from '$types';
	import Single from '../../../components/Single/Single.svelte';
	import Visual from '../../../components/Visual/Visual.svelte';
	import WideLayout from '../../../components/WideLayout/WideLayout.svelte';

	export let data: PageData;
</script>

<Single {data} />
