<script>
	import ContentCard from '$lib/components/ContentCard.svelte';

	let showMessage = true;
	let startTransition = false;
	let showBackLink = false;

    // ROMs sourced from https://www.retrogames.cc/  
    // Emulated using https://www.emulatorjs.com/   (via retrogames.cc)
	const roms = [
		'https://www.retrogames.cc/embed/9406-pac-man-midway-1.html',
		'https://www.retrogames.cc/embed/25597-tetris-world.html',
		'https://www.retrogames.cc/embed/20671-defender-ii-usa.html',
		'https://www.retrogames.cc/embed/25238-flintstones-the-usa-europe.html',
		'https://www.retrogames.cc/embed/18138-mr-nutz-europe.html',
		'https://www.retrogames.cc/embed/31284-poker-faced-paul-s-blackjack-usa-europe.html'
	];

	// start message blur-out after 3s
	setTimeout(() => {
		startTransition = true;
	}, 3000);

	// replace message with ContentCard after 4s
	setTimeout(() => {
		showMessage = false;
		// show back link 3s after ContentCard appears
		setTimeout(() => {
			showBackLink = true;
		}, 3000);
	}, 4000);

	function goBack() {
		history.back();
	}
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
				<ContentCard
					item={{
						src: roms[Math.floor(Math.random() * roms.length)],
						title: '404',
						description: '',
						tags: ['', '', '']
					}}
				/>

				<p
					class={`title-font text-sizing-2 smooth-trans-8 mt-[7vh] text-light-primary/60 dark:text-dark-primary/60 
                ${showBackLink ? 'opacity-100' : 'opacity-0'}`}
				>
					<a href="#" on:click|preventDefault={goBack} class="animate-pulse hover:text-4xl">
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
