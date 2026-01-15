<script
	lang='ts'
	setup
>
import { computed } from 'vue';
import type { HeadingLevel, ThemeColor } from '@/types.ts';

type Props = {
	/**
	 * The card image URL
	 */
	img?: string;

	/**
	 * The card image alt text
	 */
	imgAlt?: string;

	/**
	 * The title of the card
	 */
	title?: string;

	/**
	 * The subtitle of the card
	 */
	subtitle?: string;

	/**
	 * The theme color of the title, if any
	 */
	titleColor?: ThemeColor;

	/**
	 * Whether the title text should be centered
	 */
	centerTitle?: boolean;

	/**
	 * The heading level
	 */
	heading: Exclude<HeadingLevel, '6'>;
}

const { heading } = defineProps<Props>();

const titleHeading = computed(() => parseInt(heading));
const subtitleHeading = computed(() => titleHeading.value + 1);
</script>

<template>
<article class='card w-100'>
	<img
		v-if='img'
		:src='img'
		:alt='imgAlt'
		class='card-img-top'
	/>

	<CardBody tag='header'>
		<slot name='prependHeader'/>

		<component
			v-if='title || $slots.title'
			:is='`h${titleHeading}`'
			:class='[
				"card-title",
				"h5",
				"fw-normal",
				{
					[`text-${titleColor}`]: !!titleColor,
					"text-center": centerTitle
				}
			]'
		>
			<slot name='title'>
				{{ title }}
			</slot>
		</component>

		<component
			v-if='subtitle || $slots.subtitle'
			:is='`h${subtitleHeading}`'
			class='card-subtitle h6 fw-normal'
		>
			<slot name='subtitle'>
				{{ subtitle }}
			</slot>
		</component>

		<slot name='appendHeader'/>
	</CardBody>

	<slot name='body'/>
</article>
</template>
