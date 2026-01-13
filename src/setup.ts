import * as components from '@/components/index.ts';
import type { App } from 'vue';

export default function setup(app: App<Element>) {
	app
		.component('Icon', components.Icon)
		.component('Timespan', components.Timespan);
}
