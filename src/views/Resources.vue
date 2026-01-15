<script
	lang='ts'
	setup>
import { onBeforeMount, ref } from 'vue';
import { readJson } from '@/utilities.ts';
import type { Resource } from '@/types.ts';

const resources = ref<Resource[]>([]);

onBeforeMount(async () => {
	resources.value = await readJson<Resource[]>('libraryResources');
});
</script>

<template>
<ContentBlock title='Resources'>
	<CardGallery
		:col='12'
		:sm='6'
		:md='4'
		:lg='3'
		:items='resources'
	>
		<template #itemTemplate='resource'>
			<ResourceCard
				:resource='resource'
				heading='2'
				class='w-100'
			/>
		</template>
	</CardGallery>
</ContentBlock>
</template>
