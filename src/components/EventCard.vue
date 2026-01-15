<script
	lang='ts'
	setup
>
import { computed } from 'vue';
import { formatDate } from '@/utilities.ts';
import type { EventData, HeadingLevel, ThemeColor } from '@/types.ts';

type Props = {
	event: EventData;
	heading: HeadingLevel
}

const { event } = defineProps<Props>();
const eventColor = computed<ThemeColor>(() => {
	if (event.type === 'meeting') {
		return 'danger';
	}

	return 'success';
})
</script>

<template>
<Card
	:title='event.title'
	:heading='heading'
>
	<template #prependHeader>
		<div class='mb-2'>
			<span :class='[
				`bg-${eventColor}-subtle`,
				`text-${eventColor}`,
				"text-uppercase",
				"p-2",
				"rounded-2"
			]'>
				{{ event.type }}
			</span>

			<span class='text-muted p-2 small'>
				<Icon icon='location-dot'/>
				{{ event.location }}
			</span>
		</div>
	</template>

	<template #appendHeader>
		<div
			v-for='time of event.times'
			class='row'
		>
			<div class='col-4 col-sm-3 col-md-4 col-lg-5'>
				<Icon
					icon='calendar'
					class='me-2'
				/>

				<time
					:datetime='time.date!.toISOString().split("T")[0]'
				>
					{{ formatDate(time.date!) }}
				</time>
			</div>

			<div class='col-8 col-sm-9 col-md-8 col-lg-7'>
				<Icon
					icon='clock'
					class='me-2'
				/>

				<Timespan :time='time'/>
			</div>
		</div>
	</template>

	<template #body>
		<CardBody>
			<p v-for='descriptor in event.description'>
				{{ descriptor }}
			</p>
		</CardBody>
	</template>
</Card>
</template>
