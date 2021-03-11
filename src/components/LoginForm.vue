<template>
    <div class="login-form">
        <h2>Log in:</h2>
        <form @submit.prevent="handleSubmit">
            <label>E-mail:</label>
            <input type="email" required v-model="email" />
            <label>Password:</label>
            <input type="password" required v-model="password" />
            <div class="error">{{ error }}</div>
            <button>Log in</button>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";

export default {
    setup(props, context) {
        const email = ref("");
        const password = ref("");

        const { error, login } = useLogin();

        const handleSubmit = async () => {
            await login(email.value, password.value);
            if (!error.value) {
                context.emit("login");
                console.log("logged in");
                email.value = "";
                password.value = "";
            }
        };

        return { email, password, error, handleSubmit };
    },
};
</script>

<style>
.login-form * {
    display: block;
}

.login-form {
    margin: 0 28px;
    color: #001f54;
    font-weight: bold;
}

.login-form h2 {
    text-align: center;
}

.login-form label {
    margin: 20px 0 12px;
    font-size: 18px;
}

.login-form input {
    width: 85%;
    height: 48px;
    margin: 0 auto;
    border: 1px solid #cfe4e9;
    border-radius: 12px;
    padding-left: 15px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    font-family: "Lato", "sans-serif";
    font-size: 18px;
    color: #001f54;
}

.login-form input:focus {
    outline: none;
    border: 2px solid #1282a2;
}

.login-form button {
    width: 100px;
    margin: 32px auto;
    border: none;
    border-radius: 12px;
    padding: 10px 0;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    font-family: "Lato", "sans-serif";
    font-size: 20px;
    color: #fefcfb;
    background-color: #1282a2;
}

.login-form button:focus {
    outline: none;
}

.error {
    margin-top: 8px;
    color: #fa795e;
}

/* media queries */

@media (min-width: 1025px) and (orientation: landscape) {
    .login-form button {
        cursor: pointer;
    }
}
</style>
