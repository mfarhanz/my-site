<script lang="ts">
	let name = '';
	let email = '';
	let message = '';
	let status: 'idle' | 'sending' | 'sent' | 'error' = 'idle';

	const API_BASE = 'https://my-site-api.vercel.app/api'; // any API endpoints are deployed on Vercel

	async function handleSubmit() {
		status = 'sending';
		try {
			const controller = new AbortController();
			const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

			const res = await fetch(`${API_BASE}/contact`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message }),
				signal: controller.signal
			});

			clearTimeout(timeout);

			if (res.ok) {
				status = 'sent';
				name = '';
				email = '';
				message = '';
			} else {
				const data = await res.json().catch(() => ({}));
				console.error('Server responded with error:', data);
				status = 'error';
			}
		} catch (err) {
			if (err instanceof Error) {
				if (err.name === 'AbortError') {
				console.error('Request timed out')
				} else {
				console.error('Network error:', err)
				}
			} else {
				console.error('Unknown error', err)
			}
			status = 'error'
		}
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
			Interested in collaborating, hiring, or discussing a project?<br />Send me a message and I’ll
			get back to you soon.
		</p>

		<form on:submit|preventDefault={handleSubmit} class="mt-6 flex w-full max-w-md flex-col gap-4">
			<input
				bind:value={name}
				required
				type="text"
				placeholder="Your Name"
				class="smooth-trans-4 rounded-md bg-light-background-button p-3 dark:bg-dark-background-button"
			/>
			<input
				bind:value={email}
				required
				type="email"
				placeholder="Your Email"
				class="smooth-trans-4 rounded-md bg-light-background-button p-3 dark:bg-dark-background-button"
			/>
			<textarea
				bind:value={message}
				required
				rows="5"
				placeholder="Your Message"
				class="smooth-trans-4 rounded-md bg-light-background-button p-3 dark:bg-dark-background-button"
			></textarea>
			<button
				type="submit"
				class="smooth-trans-4 rounded-md bg-light-accent px-4 py-2 text-light-background hover:scale-[1.03] dark:bg-dark-accent dark:text-dark-background"
				disabled={status === 'sending'}
			>
				{status === 'sending' ? 'Sending...' : 'Send Message'}
			</button>

			{#if status === 'sent'}
				<p class="mt-2 text-green-600">✅ Message sent successfully!</p>
			{:else if status === 'error'}
				<p class="mt-2 text-red-600">❌ Something went wrong. Try again later.</p>
			{/if}
		</form>
	</div>
</section>
