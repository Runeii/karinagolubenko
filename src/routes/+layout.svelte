<script>
	import '../app.pcss';
	import Footer from '../components/Footer/Footer.svelte';
</script>

<header class="header">
	<a class="title" href="/">Karina Golubenko</a>
	<nav class="nav">
		<a href="/research">Research</a>
		<a href="/info">Info</a>
	</nav>
</header>
<div class="content">
	<slot />
</div>
<Footer />

<style lang="postcss">
	.header {
		@mixin body3;
		margin: 0 0 40px;
		padding: 16px;
		background-color: var(--background);
		display: flex;
		flex-direction: row;
		place-items: center;
		color: var(--black);
		position: sticky;
		top: 0;

		.title {
			margin-right: auto;
		}

		.nav {
			display: flex;
			flex-direction: row;
			gap: 28px;
		}

		:global(a) {
			text-decoration: none;
			color: currentColor;
		}
	}

	.content {
		margin: 0 20px auto;
	}
</style>
