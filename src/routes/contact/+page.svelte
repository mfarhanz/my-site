<script lang="ts">
	import { API_BASE } from '$lib/config';

	export let data;
	let name = '';
	let email = '';
	let message = '';
	let status: 'idle' | 'sending' | 'sent' | 'error' | 'botted' = 'idle';

	async function handleSubmit() {
		status = 'sending';
		try {
			const controller = new AbortController();
			const timeout = setTimeout(() => controller.abort(), 10000);

			const hp_val = (document.getElementById("mysitehp") as HTMLInputElement)?.value ?? "";

			const res = await fetch(`${API_BASE}/contact`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message, hp:hp_val, nonce:data.nonce }),
				signal: controller.signal,
			});

			clearTimeout(timeout);

			if (res.ok) {
				status = 'sent';
				name = '';
				email = '';
				message = '';
			} else if (res.status === 418) {
				status = 'botted';
			} else {
				const data = await res.json().catch(() => ({}));
				console.error('Server responded with error:', data);
				status = 'error';
			}
			console.log(res)
		} catch (err) {
			if (err instanceof Error) {
				if (err.name === 'AbortError') {
					console.error('Request timed out');
				} else {
					console.error('Network error:', err);
				}
			} else {
				console.error('Unknown error', err);
			}
			status = 'error';
		}
	}

	async function handleFakeSubmit() {
		// just for testing
		status = 'sending';
		// fake delay to simulate API call
		const randomDelay = Math.floor(Math.random() * (8500 - 1000 + 1)) + 1000;
		await new Promise((resolve) => setTimeout(resolve, randomDelay));
		// simulate success (or swap to 'error' to test failure)
		status = 'sent';
	}

	function autoResize(node: HTMLTextAreaElement) {
		const resize = () => {
			node.style.height = 'auto';
			node.style.height = `${node.scrollHeight}px`;
		};
		node.addEventListener('input', resize);
		resize();
		return {
			destroy() {
				node.removeEventListener('input', resize);
			}
		};
	}
</script>

<section
	class="section grid-responsive smooth-trans-8 bg-light-background pb-[10vh] pt-[9vh] text-light-text dark:bg-dark-background dark:text-dark-text"
>
	<div class="flex flex-col items-start justify-center gap-[1.7vh] text-left">
		<h1 class="title-font title-sizing smooth-trans-8 font-bold">Get in Touch</h1>
		<p
			class="text-sizing-2 smooth-trans-8 w-full text-light-text/80 dark:text-dark-text/80 md:w-[90%] lg:w-[85%]"
		>
			Interested in collaborating, hiring, or discussing a project?<br />Send me a message and I'll
			get back to you soon.
		</p>

		<form
			on:submit|preventDefault={handleSubmit}
			class="mt-[4vh] flex w-full max-w-[70vw] flex-col gap-[2vh] sm:gap-[2vh] md:max-w-[55vw] md:gap-[1.8vh] lg:gap-[2vh]"
		>
			<input
				bind:value={name}
				required
				type="text"
				placeholder="Your Name"
				class="text-sizing-1 input-field-lg smooth-trans-4"
			/>
			<input
				bind:value={email}
				required
				type="email"
				placeholder="Your Email"
				class="text-sizing-1 input-field-lg smooth-trans-4"
			/>
			<textarea
				bind:value={message}
				required
				rows="3"
				use:autoResize
				placeholder="Your Message"
				class="text-sizing-1 input-field-lg smooth-trans-4 resize-none overflow-hidden"
			></textarea>
			<!-- HP START -->
			 <div class="sr-only">
				<label for="mysitehp">This field should not be filled</label>
				<input
					id="mysitehp"
					name="mysitehp"
					type="text"
					tabindex="-1"
					autocomplete="off"
					class="text-sizing-1 input-field-lg"
				/>
			</div>
			<!-- HP END -->
			<button
				type="submit"
				class="standard-button button-text-sizing hover:scale-[1.04] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
				disabled={status === 'sending'}
			>
				{#if status === 'sending'}
					<span class="inline-flex items-center gap-[0.5vw]">
						<span class="loading-dots">
							{#each Array(14) as _, i}
								<span
									class="text-light-accent dark:text-dark-accent"
									style="animation-delay: {i * 0.2}s">▌</span
								>
							{/each}
						</span>
					</span>
				{:else if status === 'sent'}
					<span class="text-green-800 dark:text-green-600">🗸 Sent!</span>
				{:else if status === 'error'}
					<span class="text-red-900">✗ Failed</span>
				{:else if status === 'botted'}
					<span class="text-red-900">⚠ Bot Detected</span>
				{:else}
					Send Message
				{/if}
			</button>
		</form>
	</div>
</section>

<style>
	.loading-dots {
		display: inline-flex;
	}

	.loading-dots span {
		animation: blink 3.5s linear infinite both;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 0;
		}
		40% {
			opacity: 1;
		}
	}
</style>
