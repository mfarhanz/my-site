<script lang="ts">
	let name = ''
	let email = ''
	let message = ''
	let status: 'idle' | 'sending' | 'sent' | 'error' = 'idle'

	async function handleSubmit() {
		status = 'sending'
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message })
			})

			if (res.ok) {
				status = 'sent'
				name = ''
				email = ''
				message = ''
			} else {
				status = 'error'
			}
		} catch (err) {
			console.error('Error sending message:', err)
			status = 'error'
		}
	}
</script>

<section
	class="section grid-responsive smooth-trans-8 bg-light-background pb-[10vh] pt-[9vh] text-light-text dark:bg-dark-background dark:text-dark-text"
>
	<div class="flex flex-col items-start justify-center gap-[1.7vh] text-left">
		<h1 class="font-bold title-font title-sizing smooth-trans-8">Get in Touch</h1>
		<p class="text-sizing-2 smooth-trans-8 w-full text-light-text/80 dark:text-dark-text/80 md:w-[90%] lg:w-[85%]">
			Interested in collaborating, hiring, or discussing a project?<br>Send me a message and I’ll get back to you soon.
		</p>

        <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 mt-6 w-full max-w-md">
			<input
				bind:value={name}
				required
				type="text"
				placeholder="Your Name"
				class="p-3 rounded-md bg-light-background-button dark:bg-dark-background-button smooth-trans-4"
			/>
			<input
				bind:value={email}
				required
				type="email"
				placeholder="Your Email"
				class="p-3 rounded-md bg-light-background-button dark:bg-dark-background-button smooth-trans-4"
			/>
			<textarea
                bind:value={message}
                required
                rows="5"
                placeholder="Your Message"
                class="p-3 rounded-md bg-light-background-button dark:bg-dark-background-button smooth-trans-4"
            ></textarea>
			<button
				type="submit"
				class="px-4 py-2 rounded-md bg-light-accent dark:bg-dark-accent text-light-background dark:text-dark-background smooth-trans-4 hover:scale-[1.03]"
				disabled={status === 'sending'}
			>
				{status === 'sending' ? 'Sending...' : 'Send Message'}
			</button>

			{#if status === 'sent'}
				<p class="text-green-600 mt-2">✅ Message sent successfully!</p>
			{:else if status === 'error'}
				<p class="text-red-600 mt-2">❌ Something went wrong. Try again later.</p>
			{/if}
		</form>
	</div>
</section>