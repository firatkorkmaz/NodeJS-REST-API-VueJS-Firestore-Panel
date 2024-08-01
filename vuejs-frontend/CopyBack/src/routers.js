import HomePage from './components/HomePage.vue'
import SignIn from './components/SignIn.vue'
import SignUp from './components/SignUp.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: "HomePage",
        component: HomePage,
        path: "/",
    },
    {
        name: "SignIn",
        component: SignIn,
        path: "/signin",
    },
    {
        name: "SignUp",
        component: SignUp,
        path: "/signup",
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
