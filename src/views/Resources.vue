<script
	lang='ts'
	setup>
import { onBeforeMount, ref } from 'vue';
import { readJson } from '@/utilities.ts';
import type { Resource } from '@/types.ts';
import ResourceCard from '@/components/ResourceCard.vue';

const resources = ref<Resource[]>([]);

onBeforeMount(async () => {
	resources.value = await readJson<Resource[]>('libraryResources');
	console.log(resources.value);
});
</script>

<template>
<ContentBlock title='Resources'>
	<div class='row g-2'>
		<div
			v-for='resource in resources'
			class='col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch'
		>
			<ResourceCard
				:resource='resource'
				heading='2'
				class='w-100'
			/>
		</div>
	</div>
</ContentBlock>
</template>
