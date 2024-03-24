<script lang="ts">
	import type { PageData } from '$types';
	import Single from '../../components/Single/Single.svelte';

	export let data: PageData;
</script>

<Single {data} />
