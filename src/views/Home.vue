<template>
    <div>
        <CircleTop />
        <Logo />
        <Title />
        <transition name="switch" mode="out-in">
            <div v-if="songs.length" class="home">
                <div class="recent">
                    <h2>Recent songs:</h2>
                    <div class="recents">
                        <div v-for="song in songs" :key="song.id">
                            <SingleSong
                                @delete="load('timeStamp', 'desc', 5)"
                                :song="song"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <Spinner v-if="!error && !isEmpty" />
                <div v-if="!error && isEmpty" class="no-songs">
                    No songs in the library :( <br />
                    Please add some.
                </div>
                <Error v-if="error" />
            </div>
        </transition>
    </div>
</template>

<script>
import Error from "../components/Error";
import getSongs from "../composables/getSongs";
import CircleTop from "../components/CircleTop";
import Logo from "../components/Logo";
import Title from "../components/Title";
import SingleSong from "../components/SingleSong";
import Spinner from "../components/Spinner.vue";

export default {
    components: { CircleTop, Logo, Title, SingleSong, Spinner, Error },
    setup() {
        const { songs, error, isEmpty, load } = getSongs();

        load("timeStamp", "desc", 5);

        return { songs, error, isEmpty, load };
    },
};
</script>

<style>
.home {
    margin: 22px 20px;
    transform: translateY(-36vw);
}

.home h2 {
    margin-bottom: 20px;
    color: #001f54;
}

.recents {
    padding-top: 2px;
}

.no-songs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    font-size: 26px;
    color: #fa795e;
    font-weight: bold;
    text-align: center;
}

/* animations */

.switch-enter-from,
.switch-leave-to {
    opacity: 0;
}

.switch-enter-active,
.switch-enter-active {
    transition: 0.2s ease-out;
}

/* media queries */

@media (max-height: 790px) and (orientation: portrait) {
    .recents {
        height: 38vh;
        overflow: auto;
    }
}

@media (max-height: 660px) and (orientation: portrait) {
    .recents {
        height: 36vh;
    }
}

@media (min-width: 1025px) and (orientation: landscape) {
    .home {
        transform: translateY(-135px);
    }
}
</style>
