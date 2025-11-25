<script>
	import ContentCard from '$lib/components/ContentCard.svelte';
</script>

<svelte:head>
	<title>Project Not Found</title>
</svelte:head>

<section
	class="section smooth-trans-8 gap-[4vh] pb-[8vh] pt-[9vh] text-light-text dark:text-dark-text"
>
	<div class="flex min-h-[70vh] flex-col items-center justify-center">
		<ContentCard
			item={{
				src: '/misc/static_2.gif',
				title: '404',
				description: 'Project Not Found',
				tags: ['', '', '']
			}}
		/>
	</div>
</section>
