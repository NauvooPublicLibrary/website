import { createWebHistory, createRouter } from 'vue-router';
import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import Home from '@/views/Index.vue';
import Contact from '@/views/Contact.vue';
import Resources from '@/views/Resources.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/contact',
		component: Contact
	},
	{
		path: '/resources',
		component: Resources
	}
];

export default function setupRoutes(app: App<Element>) {
	const router = createRouter({
		history: createWebHistory(),
		routes
	});

	app.use(router);
}