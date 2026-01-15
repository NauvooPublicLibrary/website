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
	<div class='row g-2'>
		<div
			class='col-12 col-md-6 col-lg-4 col-xl-3 d-flex'
			v-for='member in members'
		>
			<Biography
				:person='member'
				titleHeading='2'
				subtitleHeading='3'
			/>
		</div>
	</div>
</ContentBlock>
</template>
