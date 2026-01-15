<script
	lang='ts'
	setup
>
import { onBeforeMount, ref } from 'vue';
import { getLibraryHours, mapDayNumberToName, readJson } from '@/utilities.ts';
import FooterSection from './FooterSection.vue';

import type { ContactInformation, EventTime } from '@/types.ts';

const libraryContactInfo = ref<ContactInformation>();
const libraryHours = ref<(EventTime|null)[]>();

onBeforeMount(async () => {
	libraryContactInfo.value = await readJson<ContactInformation>('libraryContact');
	libraryHours.value = await getLibraryHours();
});

const links = [
	{
		href: '/board',
		text: 'Board'
	},
	{
		href: '/staff',
		text: 'Staff'
	},
	{
		href: '/meetings/agendas',
		text: 'Meeting agendas'
	},
	{
		href: '/docs/meeting-minutes.pdf',
		text: 'Meeting minutes',
		target: '_blank'
	},
	{
		href: '/services',
		text: 'Services'
	},
	{
		href: '/policies',
		text: 'Policies'
	}
];
</script>

<template>
<footer class='text-bg-dark py-5'>
	<div class='container'>
		<div class='row'>
			<FooterSection title='Contact'>
				<ContactInfo
					v-if='libraryContactInfo'
					:contact='libraryContactInfo!'
					linkColor='light'
				/>
			</FooterSection>

			<FooterSection title='Hours'>
				<ul
					v-if='libraryHours'
					class='list-unstyled'
				>
					<li
						v-for='(hours, i) in libraryHours'
						class='row'
					>
						<div class='col-2 col-md-3'>
							{{ mapDayNumberToName(i) }}
						</div>

						<div class='col-10 col-md-9'>
							<template v-if='hours'>
								<Timespan :time='hours'/>
							</template>
							<template v-else>
								CLOSED
							</template>
						</div>
					</li>
				</ul>
			</FooterSection>

			<FooterSection title='Information'>
				<nav>
					<ul class='list-unstyled'>
						<li
							v-for='link of links'
						>
							<RouterLink
								:to='link.href'
								class='text-white'
								:target='link.target'
							>
								{{ link.text }}
							</RouterLink>
						</li>
					</ul>
				</nav>
			</FooterSection>
		</div>

		<hr class='border-bottom border-white'/>

		<p class='mb-0'>
			&copy;{{ new Date().getFullYear() }} Nauvoo Public Library. All rights reserved.
		</p>
	</div>
</footer>
</template>
