import setupComponents from './components.ts';
import setupRoutes from './routes.ts';

import type { App } from 'vue';

export default function setup(app: App<Element>) {
	setupComponents(app);
	setupRoutes(app);
}