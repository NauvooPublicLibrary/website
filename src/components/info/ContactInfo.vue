<script
	setup
	lang="ts">
import { computed } from 'vue';
import type { ContactInformation, ThemeColor } from '@/types';

type Props = {
	/**
	 * The contact info to render
	 */
	contact: ContactInformation;

	/**
	 * The color to use for links
	 */
	linkColor?: ThemeColor;
}

const { linkColor } = defineProps<Props>();

const linkColorClass = computed(() => linkColor ? `text-${linkColor}` : undefined);
</script>

<template>
	<address class='address'>
		<ContactInfoSection v-if='contact.address'>
			<template #icon>
				<Icon icon='location-dot' />
			</template>
			<template #content>
				<div>
					{{ contact.address.address1 }}
				</div>
				<div v-if='contact.address.address2'>
					{{ contact.address.address2 }}
				</div>
				<div v-if='contact.address.poBox'>
					{{ contact.address.poBox }}
				</div>
				<div>
					{{ contact.address.city }}, {{ contact.address.state }}
				</div>
			</template>
		</ContactInfoSection>

		<ContactInfoSection v-if='contact.phone'>
			<template #icon>
				<Icon icon='phone' />
			</template>
			<template #content>
				<a
					:href='`tel:${contact.phone}`'
					:class='linkColorClass'
				>
					{{ contact.phone }}
				</a>
			</template>
		</ContactInfoSection>

		<ContactInfoSection v-if='contact.fax'>
			<template #icon>
				<Icon icon='fax' />
			</template>
			<template #content>
				{{ contact.fax }}
			</template>
		</ContactInfoSection>

		<ContactInfoSection v-if='contact.email'>
			<template #icon>
				<Icon icon='envelope' />
			</template>
			<template #content>
				<a
					:href='`mailto:${contact.email}`'
					:class='linkColorClass'
				>
					{{ contact.email }}
				</a>
			</template>
		</ContactInfoSection>
	</address>
</template>

<style scoped>
.address {
	font-style: normal;
}
</style>
