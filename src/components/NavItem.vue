<script
	lang='ts'
	setup
>
import { computed } from 'vue';

const { href } = defineProps<{ href: string }>();

const isLocal = computed(() => href.startsWith('/'));
const classes = 'nav-link text-uppercase';
</script>

<template>
<li class='nav-item'>
	<RouterLink
		v-if='isLocal'
		:to='href'
		:class='classes'
	>
		<slot/>
	</RouterLink>

	<a
		v-else
		:href='href'
		target='_blank'
		:class='classes'
	>
		<slot/>
	</a>
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
