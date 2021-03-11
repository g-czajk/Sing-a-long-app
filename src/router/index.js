import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Add from "../views/Add.vue";
import Search from "../views/Search.vue";
import Song from "../views/Song.vue";
import Edit from "../views/Edit.vue";
import { projectAuth } from "../firebase/config";

// auth guard
const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser;
    if (!user) {
        next({ name: "Login" });
    }
    next();
};

const requireNoAuth = (to, from, next) => {
    let user = projectAuth.currentUser;
    if (user) {
        next({ name: "Home" });
    }
    next();
};

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
        beforeEnter: requireNoAuth,
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        beforeEnter: requireAuth,
    },
    {
        path: "/add",
        name: "Add",
        component: Add,
        beforeEnter: requireAuth,
    },
    {
        path: "/search",
        name: "Search",
        component: Search,
        beforeEnter: requireAuth,
    },
    {
        path: "/song/:id",
        name: "Song",
        component: Song,
        props: true,
        beforeEnter: requireAuth,
    },
    {
        path: "/edit/:id",
        name: "Edit",
        component: Edit,
        props: true,
        beforeEnter: requireAuth,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
