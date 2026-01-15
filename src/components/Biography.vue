<script
	setup
	lang='ts'
>
import { computed } from 'vue';
import type { BoardPosition, HeadingLevel, Person } from '@/types.ts';

type Props = {
	person: Person<BoardPosition>;
	heading: Exclude<HeadingLevel, 6>;
}

const { person, heading } = defineProps<Props>();
const fullName = computed(() => {
	if (person.firstName && person.lastName) {
		return `${person.firstName} ${person.lastName}`;
	}

	return '(Vacant)';
});
const titleHeading = computed(() => parseInt(heading));
const subtitleHeading = computed(() => titleHeading.value - 1);
</script>

<template>
<article class='card w-100'>
	<img
		:src='person.image ?? "/images/board/vacant.jpg"'
		:alt="`${fullName}'s profile picture`"
		class='card-img-top'
	/>
	<header class='card-body'>
		<component
			:is='`h${titleHeading}`'
			class='card-title h5 text-primary'
		>
			{{ fullName }}
		</component>
		<component
			:is='`h${subtitleHeading}`'
			class='card-subtitle h6'
		>
			{{ person.position }}
		</component>
	</header>

	<section
		v-if='person.biography && person.biography.length > 0'
		class='card-body'
	>
		<p v-for='p in person.biography'>
			{{ p }}
		</p>
	</section>

	<section
		v-if='person.contact'
		class='card-body'
	>
		<p>Contact {{ fullName }}:</p>
		<ContactInfo :contact='person.contact'/>
	</section>
</article>
</template>
