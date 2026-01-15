<script
	lang='ts'
	setup>
import { onBeforeMount, ref } from 'vue';
import { readJson } from '@/utilities.ts';
import type { ContactInformation } from '@/types.ts';
import { ContentBlock } from '@/components';

const libraryContactInfo = ref<ContactInformation>();

onBeforeMount(async () => {
	libraryContactInfo.value = await readJson<ContactInformation>('libraryContact');
});
</script>

<template>
<ContentBlock title='Contact us'>
	<p>
		Feel free to call us, fax us, email us, or come visit us in person!
	</p>

	<ContactInfo
		v-if='libraryContactInfo'
		:contact='libraryContactInfo'
	/>
</ContentBlock>
</template>
