<script
	lang='ts'
	setup
>
type Props = {
	family?: 'solid'|'brands'
	icon: string;
}

const { family = 'solid' } = defineProps<Props>();
</script>

<template>
<i :class='`fa${family[0]} fa-${icon}`'/>
</template>
