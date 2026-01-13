<script
	lang='ts'
	setup
>
import { onBeforeMount, ref } from 'vue';
import { getLibraryHours, readJson } from '@/utilities.ts';
import type { ContactInformation, EventTime } from '@/types.ts';

const todaysHours = ref<EventTime|null>();
const contactInfo = ref<ContactInformation>();

onBeforeMount(async () => {
	const hours = await getLibraryHours();
	const today = new Date().getDay();
	todaysHours.value = hours[today];
	contactInfo.value = await readJson<ContactInformation>('libraryContact')!;
});
</script>

<template>
<div class='bg-dark text-white'>
	<div class='container d-md-flex justify-content-md-between text-center'>
		<p class='text-light mb-0 py-2'>
			<Icon icon='clock'/>
			<template v-if='todaysHours'>
				Today's hours: <Timespan :time='todaysHours'/>
			</template>
			<template v-else>
				Today's hours: CLOSED
			</template>
		</p>

		<a
			class='d-block text-decoration-none bg-primary text-white py-2 px-3'
			:href='`tel:${contactInfo?.phone}`'
		>
			<Icon icon='phone'/>
			{{ contactInfo?.phone }}
		</a>
	</div>
</div>
</template>
