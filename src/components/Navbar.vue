<template>
    <div class="nav">
        <div class="nav-item">
            <router-link to="/home"
                ><font-awesome-icon :icon="['fas', 'home']"/><span
                    class="description"
                    >Home</span
                ><span class="line"></span
            ></router-link>
        </div>
        <div class="nav-item">
            <router-link to="/add"
                ><font-awesome-icon :icon="['fas', 'plus-circle']" /><span
                    class="description"
                    >Add new song</span
                ><span class="line"></span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="/search"
                ><font-awesome-icon :icon="['fas', 'search']" /><span
                    class="description"
                    >Search</span
                ><span class="line"></span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.nav {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    position: absolute;
    bottom: 2.5%;
}

.nav-item svg {
    font-size: 30px;
    color: #034078;
}

.nav-item:nth-of-type(2) svg {
    font-size: 44px;
}

.nav-item a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    color: #034078;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
}

.nav-item:nth-of-type(1) a,
.nav-item:nth-of-type(3) a {
    width: 86px;
}

.nav-item .description {
    padding-top: 7px;
}

.nav-item .line {
    width: 0;
    height: 2px;
    margin-top: 7px;
    background-color: #034078;
    transition: 0.3s;
}

.nav a.router-link-active .line {
    width: 120%;
}
</style>
