<script
	setup
	lang='ts'>
defineProps<{ title: string }>();
</script>

<template>
	<article class='col-12 col-md-4'>
		<h2>{{ title }}</h2>

		<slot/>
	</article>
</template>
