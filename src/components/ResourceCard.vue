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
<article class='card'>
	<div>
		<section class='card-body'>
			<component
				:is='`h${heading}`'
				class='card-title text-center h5 fw-light'
			>
				<Link
					:href='resource.url'
					class='stretched-link text-decoration-none'
				>
					{{ resource.text }}
				</Link>
			</component>
		</section>
	</div>
</article>
</template>
