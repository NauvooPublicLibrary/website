<script
	setup
	lang='ts'
>
import { computed } from 'vue';

const { href } = defineProps<{ href: string }>();

const isLocal = computed(() => href.startsWith('/'));
</script>

<template>
<RouterLink
	v-if='isLocal'
	:to='href'
>
	<slot/>
</RouterLink>
<a
	v-else
	:href='href'
	target='_blank'
>
	<slot/>
</a>
</template>
