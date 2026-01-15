import { createWebHistory, createRouter } from 'vue-router';
import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import Home from '@/views/Index.vue';
import Contact from '@/views/Contact.vue';
import Resources from '@/views/Resources.vue';
import Board from '@/views/Board.vue';
import Staff from '@/views/Staff.vue';
import Services from '@/views/Services.vue';

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
	},
	{
		path: '/board',
		component: Board
	},
	{
		path: '/staff',
		component: Staff
	},
	{
		path: '/services',
		component: Services
	}
];

export default function setupRoutes(app: App<Element>) {
	const router = createRouter({
		history: createWebHistory(),
		routes
	});

	app.use(router);
}