<script
	lang='ts'
	setup
>
import { ref, onBeforeMount } from 'vue';
import { readJson } from '@/utilities.ts';

import type { Person, StaffPosition } from '@/types.ts';
import { CardGallery } from '@/components';

const staffMembers = ref<Person<StaffPosition>[]>([]);

onBeforeMount(async () => {
	const allStaff = await readJson<Person<StaffPosition>[]>('staffMembers');
	const orderedMembers: Person<StaffPosition>[] = [];

	orderedMembers.push(allStaff.find(p => p.position === 'Director')!);
	orderedMembers.push(...allStaff.filter(p => p.position === 'Aide'));

	staffMembers.value = orderedMembers;
});
</script>

<template>
<ContentBlock title='Meet the Staff'>
	<CardGallery
		col='12'
		md='6'
		lg='3'
		:items='staffMembers'
	>
		<template #itemTemplate='person'>
			<Biography
				:person='person'
				heading='2'
			/>
		</template>
	</CardGallery>
</ContentBlock>
</template>
