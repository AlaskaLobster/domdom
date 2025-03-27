import { createApp } from 'vue';
import App from './components/App.vue'; // Assuming App.vue is the main component

import router from './router';
import { setupLogger } from './logger'; // Import logger setup

const app = createApp(App); // Create the app instance
app.use(router);
setupLogger(); // Set up logger
app.mount('#app');
