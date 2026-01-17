<script
	setup
	lang='ts'>
import { onBeforeMount, ref } from 'vue';
import { getEvents } from '@/utilities.ts';
import type { EventData } from '@/types.ts';

const events = ref<EventData[]>([]);

onBeforeMount(async () => {
	const allEvents = await getEvents();

	// Only show up to 6 events on this page
	events.value = allEvents.slice(0, 6);
})
</script>

<template>
<Hero
	backgroundImage='/images/community-center.jpg'
	:style='{
		backgroundPositionX: "center",
		backgroundPositionY: "85%",
		height: "50vh"
	}'
>
</Hero>

<Hero backgroundColor='secondary'>
	<h2>
		The Nauvoo Public Library mission
	</h2>
	<p>
		The mission of the Nauvoo Public Library is to provide materials and services for community residents of all ages for personal enrichment, enjoyment and educational needs. The library is dedicated to providing practical access to all forms of media. Programs will be developed to stimulate children’s interest and appreciation for reading and learning.
	</p>
</Hero>

<ContentBlock
	title='Upcoming events'
	heading='2'
>
	<CardGallery
		col='12'
		md='6'
		lg='4'
		:items='events'
	>
		<template #itemTemplate='event'>
			<EventCard
				:event='event'
				heading='3'
			/>
		</template>
	</CardGallery>
</ContentBlock>
</template>
