<script
	setup
	lang='ts'
>
import { ref, onBeforeMount } from 'vue';
import { readJson } from '@/utilities.ts';

import type { BoardPosition, Person } from '@/types.ts';

const members = ref<Person<BoardPosition>[]>();

onBeforeMount(async () => {
	const allMembers = await readJson<Person<BoardPosition>[]>('boardMembers');
	const orderedMembers: Person<BoardPosition>[] = [];

	orderedMembers.push(allMembers.find(p => p.position === 'President')!);
	orderedMembers.push(allMembers.find(p => p.position === 'Vice-President')!);
	orderedMembers.push(allMembers.find(p => p.position === 'Secretary')!);
	orderedMembers.push(allMembers.find(p => p.position === 'Treasurer')!);
	orderedMembers.push(...allMembers.filter(p => p.position === 'Member'));

	members.value = orderedMembers;
});
</script>

<template>
<ContentBlock title='Meet the board'>
	<CardGallery
		:items='members'
		:col='12'
		:md='6'
		:lg='4'
		:xl='3'
	>
		<template #itemTemplate='person'>
			<Biography
				:person='person'
				titleHeading='2'
				subtitleHeading='3'
			/>
		</template>

	</CardGallery>
</ContentBlock>
</template>
