<script
	lang='ts'
	setup>
import type { HeadingLevel, Resource } from '@/types.ts';

type Props = {
	resource: Resource;
	heading: HeadingLevel
}

defineProps<Props>();
</script>

<template>
<Card
	:heading='heading'
	centerTitle
>
	<template #title>
		<Link
			:href='resource.url'
			class='stretched-link text-decoration-none'
		>
			{{ resource.text }}
		</Link>
	</template>
</Card>
</template>
