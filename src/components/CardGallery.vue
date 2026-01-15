<script
	lang='ts'
	generic='T'
	setup
>
import type { ColumnSize, GapSize } from '@/types.ts';

type Props<T> = {
	/**
	 * The number of columns each gallery item should span on the default breakpoint
	 */
	col?: ColumnSize;

	/**
	 * The number of columns each gallery item should span on the small breakpoint
	 */
	sm?: ColumnSize;

	/**
	 * The number of columns each gallery item should span on the medium breakpoint
	 */
	md?: ColumnSize;

	/**
	 * The number of columns each gallery item should span on the large breakpoint
	 */
	lg?: ColumnSize;

	/**
	 * The number of columns each gallery item should span on the extra-large breakpoint
	 */
	xl?: ColumnSize;

	/**
	 * The number of columns each gallery item should span on the extra-extra-large breakpoint
	 */
	xxl?: ColumnSize;

	/**
	 * The gap size between gallery items
	 */
	gap?: GapSize;

	/**
	 * The gallery items to render
	 */
	items: T[];
}

const {
	col = 12,
	gap = 2
} = defineProps<Props<T>>();
</script>

<template>
<div
	:class='[
		"row",
		`g-${gap}`
	]'
>
	<div
		v-for='item in items'
		:class='[
			"d-flex",
			`col-${col}`,
			{
				[`col-sm-${sm}`]: !!sm,
				[`col-md-${md}`]: !!md,
				[`col-lg-${lg}`]: !!lg,
				[`col-xl-${xl}`]: !!xl,
				[`col-xxl-${xxl}`]: !!xxl,
			}
		]'
	>
		<slot
			name='itemTemplate'
			v-bind='item'
		/>
	</div>
</div>
</template>
