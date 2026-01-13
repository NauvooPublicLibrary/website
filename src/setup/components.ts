import * as components from '@/components/index.ts';
import type { App } from 'vue';

export default function setupComponents(app: App<Element>) {
	app
		.component('ContactInfo', components.ContactInfo)
		.component('ContactInfoSection', components.ContactInfoSection)
		.component('Hero', components.Hero)
		.component('Icon', components.Icon)
		.component('NavItem', components.NavItem)
		.component('Timespan', components.Timespan);
}
