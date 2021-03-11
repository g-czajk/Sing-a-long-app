<template
    ><div>
        <CircleTop />
        <Logo />
        <Title />
        <div class="login">
            <LoginForm @login="enterApp" />
        </div>
    </div>
</template>

<script>
import CircleTop from "../components/CircleTop";
import Logo from "../components/Logo";
import Title from "../components/Title";
import { useRouter } from "vue-router";
import LoginForm from "../components/LoginForm";

export default {
    components: { CircleTop, Logo, Title, LoginForm },
    setup() {
        const router = useRouter();

        const enterApp = () => {
            router.push({ name: "Home" });
        };

        return { enterApp };
    },
};
</script>

<style>
.login {
    transform: translateY(-10vw);
}

/* media queries */

@media (max-height: 790px) and (orientation: portrait) {
    .login {
        transform: translateY(-24vw);
    }
}

@media (max-height: 660px) and (orientation: portrait) {
    .login {
        transform: translateY(-32vw);
    }
}

@media (min-width: 1025px) and (orientation: landscape) {
    .login {
        transform: translateY(-38px);
    }
}
</style>
