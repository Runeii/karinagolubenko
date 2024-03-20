<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error">
	<h1>{$page.error.code ?? $page.error.message}</h1>
</div>

<style lang="postcss">
	.error {
		display: flex;
		place-content: center;
		place-items: center;
		width: 100%;
		padding-top: 20vh;
	}
	h1 {
		@mixin body1;
		font-size: 120px;
		text-align: center;

		@media (min-width: 720px) {
			font-size: 180px;
		}
	}
</style>
