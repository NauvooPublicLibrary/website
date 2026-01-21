<script
	setup
	lang='ts'
>
import { computed } from 'vue';
import type { BoardPosition, HeadingLevel, Person } from '@/types.ts';
import ContactInfo from '@/components/ContactInfo.vue';

type Props = {
	person: Person<BoardPosition>;
	heading: Exclude<HeadingLevel, 6>;
}

const { person } = defineProps<Props>();
const fullName = computed(() => {
	if (person.firstName && person.lastName) {
		return `${person.firstName} ${person.lastName}`;
	}

	return '(Vacant)';
});
</script>

<template>
<Card
	:img='person.image ?? "/images/board/vacant.jpg"'
	:imgAlt="`${fullName}'s profile picture`"
	:heading='heading'
	:title='fullName'
	:subtitle='person.position'
	titleColor='primary'
>
	<template #body>
		<CardBody v-if='person.biography && person.biography.length > 0' class='flex-grow-1'>
			<p v-for='p in person.biography'>
				{{ p }}
			</p>
		</CardBody>

		<CardBody v-if='person.contact' class='flex-grow-0'>
			<p>Contact {{  fullName }}:</p>
			<ContactInfo :contact='person.contact'/>
		</CardBody>
	</template>
</Card>
</template>
