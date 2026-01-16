<script
	lang='ts'
	setup>
import { onBeforeMount, ref } from 'vue';
import { readJson } from '@/utilities.ts';
import type { Resource } from '@/types.ts';

const policies = ref<Resource[]>([]);

onBeforeMount(async () => {
	policies.value = await readJson<Resource[]>('libraryPolicies');
});
</script>

<template>
<ContentBlock title='Library policies'>
	<CardGallery
		col='12'
		sm='6'
		md='4'
		lg='3'
		:items='policies'
	>
		<template #itemTemplate='resource'>
			<ResourceCard
				:resource='resource'
				heading='2'
			/>
		</template>
	</CardGallery>
</ContentBlock>
</template>
