<script lang="ts">
	import content from '../../content/homepage.json';
	let year = new Date().getFullYear();
	const links = content.footer.map((link) => `<a href="${link.href}"">${link.text}</a>`).join(', ');
</script>

<footer class="footer">
	<div class="contact">
		<p class="heading">Get in touch:</p>
		<a href={`mailto:${content.email}`}>{content.email}</a><br />
		{@html links}
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

		@media (min-width: 720px) {
			@mixin body2;
			flex-direction: row;
			margin: 120px 40px 60px;
		}
		:global(a) {
			color: var(--dark-grey);
			text-decoration: none;
			display: inline-block;

			&:hover {
				font-style: italic;
			}
		}
	}
	.heading {
		color: var(--black);
		display: inline-block;
		width: auto;
		margin: 0;
		padding: 0;
	}

	.contact,
	.colophon {
		@media (min-width: 720px) {
			width: 50%;
		}
	}

	.colophon {
		@media (min-width: 720px) {
			text-align: right;
		}
	}
</style>
