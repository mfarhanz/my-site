<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { API_BASE } from '$lib/config';

	export let data;
	let name = '';
	let email = '';
	let message = '';
	let status: 'idle' | 'sending' | 'sent' | 'error' = 'idle';

	async function handleSubmit() {
		status = 'sending';
		try {
			const controller = new AbortController();
			const timeout = setTimeout(() => controller.abort(), 10000);

			const hp_val = (document.getElementById('mysitehp') as HTMLInputElement)?.value ?? '';

			const res = await fetch(`${API_BASE}/contact`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message, hp: hp_val, nonce: data.nonce }),
				signal: controller.signal
			});

			clearTimeout(timeout);

			if (res.ok) {
				status = 'sent';
				name = '';
				email = '';
				message = '';
				toast('Message sent!', {
					duration: Infinity,
					class:
						'bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg shadow-lg flex justify-between items-center'
				});
			} else {
				const data = await res.json().catch(() => ({}));
				toast(data.error);
				status = 'error';
			}
		} catch (err) {
			if (err instanceof Error) {
				if (err.name === 'AbortError') {
					toast('Request timed out, try again later');
				} else {
					toast(`Internal server error: ${err.message}`);
				}
			} else {
				toast('Something went wrong');
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
		toast('Sent successfully');
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
			on:submit|preventDefault={handleFakeSubmit}
			class="mt-[4vh] flex w-full max-w-[70vw] flex-col gap-[2vh] sm:gap-[2vh] md:max-w-[55vw] md:gap-[1.8vh] lg:gap-[2vh]"
		>
			<input
				bind:value={name}
				type="text"
				placeholder="Your Name"
				class="text-sizing-1 input-field-lg smooth-trans-4"
			/>
			<input
				bind:value={email}
				type="email"
				placeholder="Your Email"
				class="text-sizing-1 input-field-lg smooth-trans-4"
			/>
			<textarea
				bind:value={message}
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
					<span class="overflow-clip text-light-text dark:text-dark-text loader">✉ ======== ⧖</span>
				{:else if status === 'sent'}
					<span class="text-green-800 dark:text-green-600">✉ ======== ✔</span>
				{:else if status === 'error'}
					<span class="text-red-900">✉ ======== ✘</span> 
				{:else}
					Send Message
				{/if}
			</button>
		</form>
	</div>
</section>

<style>
	.loader {
		font-weight: bold;
		font-family: monospace;
		clip-path: inset(0 11ch 0 0);
		animation: l4 1s steps(9) infinite;
	}
	@keyframes l4 {
		to {
			clip-path: inset(0 -4ch 0 0);
		}
	}
</style>
