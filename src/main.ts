import { createApp } from 'vue';
import App from '@/App.vue';
import setup from '@/setup/index.ts';

import '@/styles/index.scss';

const app = createApp(App);
setup(app);
app.mount('#app');
