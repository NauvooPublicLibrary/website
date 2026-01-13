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
