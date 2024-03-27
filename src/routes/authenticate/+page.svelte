<script lang="ts">
	import type { ActionData } from '$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import cross from './cross.svg';
	export let form: ActionData;

	let slug = form?.slug ?? $page.url.searchParams.get('slug') ?? '/';

	const handleClose = () => {
		history.back();
		return false;
	};
</script>

<div class="background">
	<a class="cross" href={`/${slug}`} on:click={handleClose}>
		<img alt="cross" src={cross} />
	</a>
	<form class="box" action="?/authenticate" method="POST">
		<h1>Password protected page</h1>
		<p class="description">Please enter your password to get access.</p>
		<input type="hidden" name="csrf" value={form?.csrf} />
		<input type="hidden" name="slug" value={slug} />
		<input id="password" name="password" placeholder="Password" type="password" />
		<button>Submit</button>
		{#if form?.incorrect}
			<p class="error">Incorrect password</p>
		{/if}
	</form>
</div>

<style lang="postcss">
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(var(--overlay-tuple) / 0.98);
		display: flex;
		place-content: center;
		place-items: center;
		z-index: 3;
	}
	.cross {
		position: fixed;
		top: 28px;
		right: 16px;
		height: 38px;
		width: 38px;

		@media (min-width: 540px) {
			top: 32px;
			right: 40px;
			height: 60px;
			width: 60px;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.box {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 32px 20px;
		max-width: calc(100vw - 32px);

		@media (min-width: 540px) {
			padding: 58px 40px;
		}

		h1 {
			@mixin body2;
			margin: 0 0 8px;
			padding: 0;
		}

		.description {
			@mixin body4;
			margin: 0 0 32px;
			padding: 0;

			@media (min-width: 540px) {
				@mixin body3;
				margin: 0 0 60px;
			}
		}

		.error {
			@mixin body4;
			margin: 16px 0 0;
			padding: 0;
			color: red;
		}

		input {
			@mixin body3;
			margin: 0 0 16px;
			padding: 16px 10px;
			border: 1px solid var(--black);
			color: var(--dark-grey);
		}

		button {
			@mixin body3;
			appearance: none;
			width: 100%;
			padding: 16px 0;
			background-color: var(--black);
			border: 1px solid transparent;
			color: white;
			transition: all 0.2s ease-out;
			cursor: pointer;

			@media (min-width: 540px) {
				padding: 16px 200px;
			}

			&:hover {
				background-color: white;
				color: var(--black);
				border: 1px solid var(--black);
			}
		}
	}
</style>
