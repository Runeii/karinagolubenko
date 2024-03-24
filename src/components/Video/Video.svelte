<script lang="ts">
	import { PUBLIC_BUNNY_CDN_HOSTNAME } from '$env/static/public';
	import { onMount } from 'svelte';
	import { getVideoDataById } from './getVideoDataById';

	export let video: BunnyVideo | undefined = undefined;
	export let id: string | undefined = undefined;

	let hasStartedPlaying = false;
	let videoEl: HTMLVideoElement;
	onMount(() => {
		if (video || !id) {
			return;
		}
		getVideoDataById(id).then((data) => {
			video = data;
		});
	});

	const getVideoStyleVariables = (video: BunnyVideo | undefined) => {
		if (!video) {
			return '';
		}

		const aspectRatio = video.width / video.height;

		const variables = {
			'--aspect-ratio': aspectRatio
		};

		return JSON.stringify(variables).replace(/["{}]/g, '').replace(/,/g, ';');
	};

	const getFallbackMp4Urls = (video: BunnyVideo) => {
		const resolutions = video.availableResolutions.split(',');
		if (!resolutions || resolutions.length === 0) {
			return null;
		}
		return resolutions
			.map((res) => {
				return `<source src="https://${PUBLIC_BUNNY_CDN_HOSTNAME}/${video.guid}/play_${resolutions[0]}.mp4" type="video/mp4" />`;
			})
			.join('');
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
	style={getVideoStyleVariables(video)}
>
	{#if video}
		{#if video.availableResolutions}
			<video
				autoplay
				controls={false}
				muted
				loop
				class="video"
				on:playing={handlePlay}
				on:click={handleClick}
				bind:this={videoEl}
			>
				<source
					src={`https://${PUBLIC_BUNNY_CDN_HOSTNAME}/${video.guid}/playlist.m3u8`}
					type="application/x-mpegURL"
				/>
				{@html getFallbackMp4Urls(video)}
				<track kind="captions" />
			</video>
		{/if}
		{#if video.thumbnailFileName}
			<button on:click={handleThumbnailClick} class="thumbnail">
				<img
					alt="test"
					src={`https://${PUBLIC_BUNNY_CDN_HOSTNAME}/${video.guid}/${video.thumbnailFileName}`}
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
