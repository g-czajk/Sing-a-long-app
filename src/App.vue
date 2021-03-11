<template>
    <div>
        <LogoutIcon v-if="user" @click="handleClick" />
        <router-view
            @songCreated="hideNav = true"
            @songUnmounted="hideNav = false"
            @inputFocus="hideNav = true"
            @inputBlur="hideNav = false"
            v-slot="{ Component }"
        >
            <transition name="route" mode="out-in">
                <component :is="Component"></component>
            </transition>
        </router-view>
        <transition name="fade" mode="out-in">
            <Navbar v-if="user && !hideNav" />
        </transition>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

import LogoutIcon from "./components/LogoutIcon";
import Navbar from "./components/Navbar";
import useLogout from "./composables/useLogout";
import getUser from "./composables/getUser";

export default {
    components: { LogoutIcon, Navbar },
    setup() {
        const hideNav = ref(false);

        // handle user logout

        const { error, logout } = useLogout();

        const handleClick = async () => {
            await logout();
            if (!error.value) {
                console.log("user logged out");
            }
        };

        // push to login screen if user logged out

        const router = useRouter();

        const { user } = getUser();

        watch(user, () => {
            if (!user.value) {
                router.push({ name: "Login" });
            }
        });

        return { user, handleClick, hideNav };
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    overflow: hidden;
}

#app {
    height: 100vh;
    max-height: 100vh;
    font-family: "Lato", "sans-serif";
    background-color: #fefcfb;
}

/* animations */

.route-enter-from,
.route-leave-to {
    opacity: 0;
}

.route-enter-active {
    transition: 0.2s ease-out;
}

.route-leave-active {
    transition: 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active {
    transition: 0.2s 0.3s ease-out;
}

/* media queries */

@media (min-width: 1025px) and (orientation: landscape) {
    #app {
        position: relative;
        width: 375px;
        height: 812px;
        border-radius: 12px;
        box-shadow: 0 0 8px #999;
        overflow: hidden;
    }
    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: rgba(216, 191, 216, 0.534);
    }
}
</style>
