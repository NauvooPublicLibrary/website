import { createWebHistory, createRouter } from 'vue-router';
import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import Home from '@/views/Index.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Home
	}
];

export default function setupRoutes(app: App<Element>) {
	const router = createRouter({
		history: createWebHistory(),
		routes
	});

	app.use(router);
}