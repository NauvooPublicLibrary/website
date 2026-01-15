<script
	lang='ts'
	setup
>
import { convertToMachineFormatTime, convertToHumanFormatTime } from '@/utilities.ts';
import type { EventTime } from '@/types.ts';

const { time } = defineProps<{ time: EventTime }>();
</script>

<template>
<time :datetime='convertToMachineFormatTime(time.startTime)'>
	{{ convertToHumanFormatTime(time.startTime) }}
</time>
<template v-if='time.endTime'>
	<span class='px-1'>
		&ndash;
	</span>
	<time :datetime='convertToMachineFormatTime(time.endTime)'>
		{{ convertToHumanFormatTime(time.endTime) }}
	</time>
</template>
</template>
