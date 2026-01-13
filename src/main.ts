import { createApp } from 'vue';
import App from './App.vue';
import setup from './setup.ts';

const app = createApp(App);
setup(app);
app.mount('#app');
