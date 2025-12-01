<script lang="ts">
	import ContentCard from '$lib/components/ContentCard.svelte';
	import { toast } from 'svelte-sonner';
	import { debounce, getRandomItem, createShufflePicker, navigateBack, isTouchDevice } from '$lib/utils/helpers';
	
	let showMessage = true;
	let startTransition = false;
	let showBackLink = false;

	const mode = getRandomItem(["tracks", "roms"]);
	
    // ROMs sourced from https://www.retrogames.cc/  
    // Emulated using https://www.emulatorjs.com/   (via retrogames.cc)
	const rgConnector = 'https://www.retrogames.cc/embed/';
	const rgRoms = [
		{src: '9406-pac-man-midway-1.html', title: 'Pac Man'},
		{src: '25597-tetris-world.html', title: 'Tetris'},
		{src: '20671-defender-ii-usa.html', title: 'Defender II'},
		{src: '25238-flintstones-the-usa-europe.html', title: 'The Flintstones'},
		{src: '18138-mr-nutz-europe.html', title: 'Mr Nutz'},
		{src: '31284-poker-faced-paul-s-blackjack-usa-europe.html', title: 'Poker Faced Paul\'s Blackjack'}
	];

	// Tracks sourced from https://soundcloud.com/  
	// Embedded using SoundCloud’s official oEmbed endpoint: https://soundcloud.com/oembed  
	// Player iframe generated via https://w.soundcloud.com/player/
	const scConnector = 'https://w.soundcloud.com/player/?visual=true&url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A';
	const scParams = '&hide_related=true&show_artwork=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&auto_play=false';
	const scOEmbedEndpoint = 'https://soundcloud.com/oembed?format=json&url=https://api.soundcloud.com/tracks/';
	const scTrackIds = ['78647178', '94993665', '253536929', '421374102', '150438358', '1456168984', '1456168984',
						'1456168984', '203876343', '868174174', '5829554', '252514864', '252515321', '252515321',
						'252515321', '20729786', '226282935', '79490440', '283861779', '21049062', '1597157346',
						'625631208', '254013744', '1571141524', '155725056', '1365188227', '19087066', '255824428',
						'106740141', '220885782', '215226554', '986631424', '256065615', '289214801', '255996553',
						'44023451', '299228001', '256065616', '318624578', '292703940', '278704248', '258954403',
						'44900418', '327273854', '260080446', '254111902', '341195720', '643004364', '53015512',
						'710006401', '62879042', '303295729', '421455243', '20944206', '152227450', '1519588816',
						'2212329185', '254521253', '35162034', '51901234', '301906273', '255870266', '255870218',
						'199624351', '108830442', '254622913', '59076130', '242872968', '76244925', '1928867318',
						'232952697', '256133595', '42327170', '635911857', '327273382', '206862293', '257074369',
						'1100264116', '28112667', '254013768', '1029682153', '1467444556', '15805186', '76876581',
						'289613927', '256260995', '195410552', '321870562', '45253025', '255052488', '253478168'

	];

	const debounced = debounce(switchItem, 3000);	// quick and dirty rate limiting

	let deck: ReturnType<typeof createShufflePicker<any>> | null = null;
	let item = { src: '', title: '404', description: '', tags: ['', '', ''], callback: debounced };

	async function fetchTrackDetails(id: number) {
		const urlEndpoint = scOEmbedEndpoint + id;
		const res = await fetch(urlEndpoint);
		if (!res.ok) return null;
		const data = await res.json();
		return parseTitle(data.title);
	}

	function parseTitle(title: string): { track: string; artist: string } {
		title = title.trim();
		// regex to match first separator (dash or 'by'), with optional spaces
		const match = title.match(/(.+?)(?:\s*(?:-|\bby\b)\s*)(.+)/i);
		if (match) {
			let track = match[1].trim();
			let artist = match[2].trim();

			// remove any extra trailing '-' or 'by' and text after in artist
			const extraSepIndex = artist.search(/\s*(-|by)\s/i);
			if (extraSepIndex >= 0) artist = artist.slice(0, extraSepIndex).trim();

			return { track, artist };
		}

		return { track: title, artist: '' };
	}

	function switchItem() {
		if (mode === 'tracks' || isTouchDevice()) {	// Tracks mode / always goes with tracks if touchscreen device
			if (!deck) deck = createShufflePicker(scTrackIds);
			const trackId = deck.pick();
			const trackSrc = scConnector + trackId + scParams;

			fetchTrackDetails(Number(trackId)).then((result) => {
				if (!result) return;
				const { track, artist } = result;

				item = {
					...item,
					src: trackSrc,
					title: 'Channel 404',
					description: track ?? '',
					tags: [artist]
				};
			});
		} else { // ROM mode
			if (!deck) deck = createShufflePicker(rgRoms);
			const rom = deck.pick();
			const romSrc = rgConnector + rom.src;

			item = {
				...item,
				src: romSrc,
				title: '404 Arcade',
				description: rom.title
			};
		}
	}

	// start message blur-out after 3s
	setTimeout(() => {
		startTransition = true;
	}, 3000);

	// replace message with ContentCard after 4s
	setTimeout(async () => {
		showMessage = false;
		switchItem();
			
		// show back link 3s after ContentCard appears
		setTimeout(() => {
			showBackLink = true;
			if (mode === "roms") toast('Any ads come from RetroGames.cc and fortunately only appear at the start. Click Play Now and please wait 10-20 seconds for them to disappear', { duration: 8000 });
		}, 3000);
	}, 4000);
</script>

<svelte:head>
	<title>404...?</title>
</svelte:head>

<section
	class="section smooth-trans-8 gap-[4vh] pb-[8vh] pt-[9vh] text-light-text dark:text-dark-text"
>
	<div class="flex min-h-[70vh] flex-col items-center justify-center text-center">
		{#if showMessage}
			<div class={startTransition ? 'animate-out' : ''}>
				<h1 class="subtitle-sizing-2 title-font mb-2 font-bold">This page doesn't exist</h1>
				<p class="title-font text-sizing-1 animate-bounce opacity-40">Redirecting…</p>
			</div>
		{:else}
			<div class="animate-in flex flex-col items-center justify-center">
				<ContentCard {item} />

				<p class={`title-font text-sizing-2 smooth-trans-8 mt-[7vh] text-light-primary/60
							 dark:text-dark-primary/60 ${showBackLink ? 'opacity-100' : 'opacity-0'}`}
				>
					<a href="#" on:click|preventDefault={navigateBack} class="hover:text-4xl">
						Take me back
					</a>
				</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.animate-out {
		animation: fracture-out 0.5s forwards ease;
	}

	.animate-in {
		animation: fracture-in 1s forwards ease;
	}
</style>
