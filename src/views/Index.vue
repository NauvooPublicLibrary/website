<script
	setup
	lang='ts'>
import { onBeforeMount, ref } from 'vue';
import { getEvents } from '@/utilities.ts';
import type { EventData } from '@/types.ts';

const events = ref<EventData[]>([]);

onBeforeMount(async () => {
	events.value = await getEvents();
})
</script>

<template>
<Hero backgroundImage='/images/community-center.jpg'>
	<h1>Nauvoo Public Library</h1>

	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cum explicabo incidunt laborum. Alias animi aperiam architecto consectetur corporis culpa cumque, debitis dicta distinctio dolore doloribus ea esse excepturi expedita facilis in ipsam labore minus nam natus non nostrum nulla optio possimus quo rem reprehenderit, ullam velit voluptate voluptatum. Veritatis.</p>
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

<Hero>
	<h2>Mission statement</h2>

	<p>
		The mission of the Nauvoo Public Library is to provide materials and services for community residents of all ages for personal enrichment, enjoyment and educational needs. The library is dedicated to providing practical access to all forms of media. Programs will be developed to stimulate children’s interest and appreciation for reading and learning.
	</p>
</Hero>
</template>
