import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes: [
		{
			id: 0,
			name: 'home',
			path: '/',
			component: HomeView
		},
		{
			id: 1,
			name: 'newgame',
			path: '/newgame',
			component: () => import('../views/NewGame.vue')
		},
		{
			id: 2,
			name: 'load',
			path: '/load',
		},
		{
			id: 3,
			name: 'settings',
			path: '/settings',
			component: () => import('../views/SettingsView.vue')
		},
		{
			id: 4,
			name: 'about',
			path: '/about',
			component: () => import('../views/AboutView.vue')
		},
		{
			id: 5,
			name: 'game',
			path: '/game',
			component: () => import('../views/Game.vue')
		},
		{
			id: 6,
			name: 'test',
			path: '/test',
			component: () => import('../views/Test.vue')
		}
	]
})

export default router