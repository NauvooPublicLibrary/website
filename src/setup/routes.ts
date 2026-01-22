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
		component: Home,
		meta: {
			title: 'Home'
		}
	},
	{
		path: '/contact',
		component: Contact,
		meta: {
			title: 'Contact us'
		}
	},
	{
		path: '/resources',
		component: Resources,
		meta: {
			title: 'Resources'
		}
	},
	{
		path: '/board',
		component: Board,
		meta: {
			title: 'Meet the board'
		}
	},
	{
		path: '/staff',
		component: Staff,
		meta: {
			title: 'Meet the staff'
		}
	},
	{
		path: '/services',
		component: Services,
		meta: {
			title: 'Our services'
		}
	},
	{
		path: '/policies',
		component: Policies,
		meta: {
			title: 'Our policies'
		}
	},
	{
		path: '/meetings',
		children: [
			{
				path: 'agendas',
				component: Agendas,
				meta: {
					title: 'Meeting agendas'
				}
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

	router.afterEach((to) => {
		document.title = `${to.meta.title} | Nauvoo Public Library`;
	});

	app.use(router);
}