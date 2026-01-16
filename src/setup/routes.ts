import { createWebHistory, createRouter } from 'vue-router';
import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import Home from '@/views/Index.vue';
import Contact from '@/views/Contact.vue';
import Resources from '@/views/Resources.vue';
import Board from '@/views/Board.vue';
import Staff from '@/views/Staff.vue';
import Services from '@/views/Services.vue';
import Agendas from '@/views/meetings/Agendas.vue';
import Policies from '@/views/Policies.vue';

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
	},
	{
		path: '/policies',
		component: Policies
	},
	{
		path: '/meetings',
		children: [
			{
				path: 'agendas',
				component: Agendas
			}
		]
	}
];

export default function setupRoutes(app: App<Element>) {
	const router = createRouter({
		history: createWebHistory(),
		scrollBehavior: () => ({ top: 0}),
		routes
	});

	app.use(router);
}