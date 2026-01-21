<script
	lang='ts'
	setup
>
import { onBeforeMount, ref } from 'vue';
import { readJson } from '@/utilities.ts';
import type { Resource } from '@/types.ts';
import { CardGallery, ContentBlock } from '@/components';

const agendas = ref<Resource[]>([]);

onBeforeMount(async () => {
	agendas.value = await readJson('meetingAgendas');
})
</script>

<template>
<ContentBlock title='Meeting agendas'>
	<CardGallery
		sm='6'
		md='4'
		lg='3'
		:items='agendas'
	>
		<template #itemTemplate='agenda'>
			<Card :heading='2'>
				<template #title>
					<Link
						:href='agenda.url'
						class='stretched-link text-decoration-none'
					>
						{{ agenda.text }}
					</Link>
				</template>
			</Card>
		</template>
	</CardGallery>
</ContentBlock>
</template>
