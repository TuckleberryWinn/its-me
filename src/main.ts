import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import PopupWindow from './components/PopupWindow.vue';
import PopupWindowB from './components/PopupWindowB.vue';

const app = createApp(App);

app.component('PopupWindow', PopupWindow);
app.component('PopupWindowB', PopupWindowB);

app.use(router);

app.mount('#app');
