import {createRouter, createWebHistory} from 'vue-router'
import HomeComponent from '../components/Home.vue';
const Dashboard = () => import ('../components/dashboards/index.vue');
const DashboardDetails = () => import('../components/dashboards/_id.vue');


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', component: HomeComponent},
        {path: '/dashboards', component: Dashboard},
        {path: '/dashboards/:id', component: DashboardDetails},

    ]
})

export default router
