<script
	setup
	lang='ts'>
import type { ThemeColor } from '@/types.ts';

type HeroProps = {
	/**
	 * The background image to render in the hero
	 */
	backgroundImage?: string;

	/**
	 * The background color to render in the hero
	 */
	backgroundColor?: ThemeColor;

	/**
	 * The text color to render in the hero
	 */
	textColor?: ThemeColor;
}

const {
	backgroundColor = 'primary',
	textColor = 'white'
} = defineProps<HeroProps>();
</script>

<template>
	<section
		:class='[
			"hero",
			"d-flex",
			"justify-content-center",
			"align-items-center",
			"position-relative",
			"background-image-cover",
			`bg-${backgroundColor}`,
			`text-${textColor}`,
			{
				"ratio ratio-16x9": !!backgroundImage
			}
		]'
		:style='{
			backgroundImage: backgroundImage ? `url("${backgroundImage}")` : undefined
		}'
	>
		<div
			class='hero-backdrop position-absolute w-100 h-100 bg-dark opacity-50'
			v-if='backgroundImage'
		/>

		<div class='hero-content position-relative container py-5'>
			<slot/>
		</div>
	</section>
</template>

<style scoped>
.hero {
	background-size: cover;
}
</style>