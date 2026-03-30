import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import { newSceneReset } from '@/composables/useTooltip';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
});

router.afterEach((to, from) => {
	newSceneReset();
});

export default router;
