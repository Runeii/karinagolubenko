<script>
	let year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="contact">
		<p class="heading">Get in touch:</p>
		<a href="">long.emailaddress@gmail.com</a>
		<a href="">+123 456 7890</a>
		<a href="">linkedin</a>
		<a href="">årena</a>
		<a href="">årenainstagram</a>
	</div>
	<div class="colophon">
		©{year} All rights reserved<br />Developed by
		<a href="https://www.andrewthomashill.co.uk">Andrew Hill</a>
	</div>
</footer>

<style lang="postcss">
	.footer {
		@mixin body3;
		color: var(--black);
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin: 52px 16px 16px;
	}
	:global(a) {
		color: var(--dark-grey);
		text-decoration: none;
		display: inline-block;
	}
	.heading {
		color: var(--black);
		display: inline-block;
		width: auto;
		margin: 0;
		padding: 0;
	}
</style>
