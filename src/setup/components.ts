import * as components from '@/components/index.ts';
import type { App } from 'vue';

export default function setupComponents(app: App<Element>) {
	app
		.component('Biography', components.Biography)
		.component('ContactInfo', components.ContactInfo)
		.component('ContactInfoSection', components.ContactInfoSection)
		.component('ContentBlock', components.ContentBlock)
		.component('EventCard', components.EventCard)
		.component('Hero', components.Hero)
		.component('Icon', components.Icon)
		.component('Link', components.Link)
		.component('NavItem', components.NavItem)
		.component('ResourceCard', components.ResourceCard)
		.component('Timespan', components.Timespan);
}
