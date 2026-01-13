<script
	lang='ts'
	setup
>
import { computed } from 'vue';

const { href } = defineProps<{ href: string }>();

const target = computed(() => href.startsWith('http') ? '_blank' : undefined);
</script>

<template>
<li class='nav-item'>
	<RouterLink
		:to='href'
		:target='target'
		class='nav-link text-uppercase'
	>
		<slot/>
	</RouterLink>
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
