<script
	lang='ts'
	setup
>
const { href } = defineProps<{ href: string }>();
</script>

<template>
<li class='nav-item'>
	<Link
		:href='href'
		class='nav-link text-uppercase'
	>
		<slot/>
	</Link>
</li>
</template>

<style scoped>
.nav-link {
	border-bottom: 2px solid transparent;
	transition: border-bottom-color 200ms ease-in-out;

	&:hover {
		border-bottom-color: var(--bs-primary);
	}
}
</style>
