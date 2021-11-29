import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Help from '../views/Help.vue'
import Brewery from '../views/help/Brewery.vue'
import Commands from '../views/help/Commands.vue'

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/help/brewery',
    name: 'Brewery',
    component: Brewery
  },
  {
    path: '/help/commands',
    name: 'Commands',
    component: Commands
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
