<script
	lang='ts'
	setup
>
const { tag = 'section' } = defineProps<{ tag: string }>();
</script>

<template>
<component
	:is='tag'
	class='card-body'
>
	<slot/>
</component>
</template>
