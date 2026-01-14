<script
	lang='ts'
	setup
>
import type { HeadingLevel } from '@/types.ts';

type Props = {
	/**
	 * The level of the block heading
	 */
	heading: HeadingLevel;

	/**
	 * The content of the block heading
	 */
	title: string;
}

defineProps<Props>();
</script>

<template>
<div class='container py-5'>
	<component
		:is='`h${heading}`'
		class='mb-5'
	>
		{{ title }}
	</component>

	<slot/>
</div>
</template>
