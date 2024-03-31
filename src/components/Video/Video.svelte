<script lang="ts">
	import { PUBLIC_BUNNY_CDN_HOSTNAME } from '$env/static/public';
	import { onMount } from 'svelte';
	import { getVideoDataById } from './getVideoDataById';
	import Hls from 'hls.js';

	export let video: BunnyVideo | undefined = undefined;
	export let id: string | undefined = undefined;

	let hasStartedPlaying = false;
	let videoEl: HTMLVideoElement;
	let imageEl: HTMLImageElement;

	const getFallbackMp4Urls = (video: BunnyVideo) => {
		const resolutions = video.availableResolutions.split(',');
		if (!resolutions || resolutions.length === 0) {
			return null;
		}
		return resolutions.map(
			(res) => `https://${PUBLIC_BUNNY_CDN_HOSTNAME}/${video.guid}/play_${res}.mp4`
		);
	};

	onMount(async () => {
		if (!id && !video) {
			return;
		}

		if (!video) {
			video = await getVideoDataById(id);
		}

		const src = `https://${PUBLIC_BUNNY_CDN_HOSTNAME}/${video.guid}/playlist.m3u8`;

		if (!videoEl || !src) {
			console.log('no videoEl or src');
			return;
		}
		if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
			videoEl.src = src;
			return;
		}
		if (Hls.isSupported()) {
			var hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(videoEl);

			hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
				hls.currentLevel = hls.levels.length - 1;
			});

			return;
		}

		const fallbacks = getFallbackMp4Urls(video);
		if (!fallbacks) {
			return;
		}

		videoEl.src = fallbacks.reverse()[0];
	});

	const getVideoStyleVariables = (video: BunnyVideo | undefined, image: HTMLImageElement) => {
		if (!video) {
			return '';
		}

		const variables = {
			'--aspect-ratio':
				image?.naturalWidth && image.naturalWidth > 0
					? `${image.naturalWidth} / ${image.naturalHeight}`
					: `${video.width} / ${video.height}`
		};

		return JSON.stringify(variables).replace(/["{}]/g, '').replace(/,/g, ';');
	};

	const handlePlay = () => {
		hasStartedPlaying = true;
	};

	const handleClick = () => {
		if (videoEl.paused) {
			videoEl.play();
		} else {
			videoEl.pause();
		}
	};

	const handleThumbnailClick = () => {
		videoEl.play();
	};
</script>

<article
	class={`video ${hasStartedPlaying && 'hasStartedPlaying'} ${$$restProps.class}`}
	style={getVideoStyleVariables(video, imageEl)}
>
	{#if video}
		{#if video.availableResolutions}
			<video
				autoplay
				controls={false}
				playsinline
				muted
				loop
				class="video"
				on:playing={handlePlay}
				on:click={handleClick}
				bind:this={videoEl}
			/>
		{/if}
		{#if video.thumbnailFileName}
			<button on:click={handleThumbnailClick} class="thumbnail">
				<img
					alt="test"
					src={`https://${PUBLIC_BUNNY_CDN_HOSTNAME}/${video.guid}/${video.thumbnailFileName}`}
					bind:this={imageEl}
				/>
			</button>
		{/if}
	{/if}
</article>

<style lang="postcss">
	.video {
		--aspect-ratio: 16 / 9;
		display: flex;
		justify-content: center;
		align-items: center;
		height: auto;
		width: 100%;
		aspect-ratio: var(--aspect-ratio);
		background-color: var(--light-grey);
		position: relative;

		.video,
		.thumbnail {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			opacity: 1;
			transition: opacity 250ms ease-in;
			object-fit: cover;
		}

		.thumbnail {
			border: none;
			outline: none;
			background: none;
			appearance: none;
			display: block;

			img {
				position: absolute;
				inset: 0;
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&.hasStartedPlaying {
			.thumbnail {
				opacity: 0;
				pointer-events: none;
			}
		}
	}
</style>
