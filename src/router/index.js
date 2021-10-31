import Vue from 'vue';
import VueRouter from 'vue-router';
import ToDo from '../views/ToDo.vue';
import About from '../views/About.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'ToDo',
        component: ToDo
    },
    {
        path: '/about',
        name: "About",
        component: About
    }
];

const router = new VueRouter({
    routes
});

export default router;