<template>
    <div>
        <CircleTop class="circleup" />
        <Title class="titleup" />
        <transition name="switch" mode="out-in">
            <div v-if="songs.length" class="search">
                <div class="search-results">
                    <h2>Search:</h2>
                    <div class="songs">
                        <div v-for="song in filteredSongs" :key="song.id">
                            <SingleSong @delete="load('title')" :song="song" />
                        </div>
                        <div v-if="!filteredSongs.length" class="no-match">
                            No songs matching criteria
                        </div>
                    </div>
                </div>
                <div class="search-form">
                    <input
                        ref="input"
                        @focus="inputFocus"
                        @blur="inputBlur"
                        v-model="search"
                        type="text"
                    />
                    <select v-model="select">
                        <option value="title">title</option>
                        <option value="artist">artist</option>
                        <option value="genre">genre</option>
                        <option value="bpm">BPM</option>
                    </select>
                    <font-awesome-icon :icon="['fas', 'sort-down']" />
                    <span>Search by:</span>
                </div>
            </div>
            <div v-else>
                <Spinner v-if="!error && !isEmpty" />
                <div v-if="!error && isEmpty" class="no-songs">
                    <p>
                        No songs in the library :( <br />
                        Please add some.
                    </p>
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
import { computed, ref } from "vue";

export default {
    components: { CircleTop, Logo, Title, SingleSong, Spinner, Error },
    setup(props, context) {
        const select = ref("title");

        const search = ref("");

        const { songs, error, isEmpty, load } = getSongs();

        load("title");

        // filter through songs

        const filteredSongs = computed(() => {
            if (select.value === "title") {
                return songs.value.filter((song) =>
                    song.title
                        .toLowerCase()
                        .startsWith(search.value.toLowerCase())
                );
            }
            if (select.value === "artist") {
                return songs.value.filter((song) =>
                    song.artist
                        .toLowerCase()
                        .startsWith(search.value.toLowerCase())
                );
            }
            if (select.value === "genre") {
                return songs.value.filter((song) =>
                    song.genre
                        .toLowerCase()
                        .startsWith(search.value.toLowerCase())
                );
            }
            if (select.value === "bpm") {
                return songs.value.filter((song) =>
                    song.bpm.toString().startsWith(search.value)
                );
            }
        });

        // handle navbar hide/show on input focus/blur

        const input = ref(null);
        const inputFocus = () => {
            context.emit("inputFocus");
        };
        const inputBlur = () => {
            context.emit("inputBlur");
        };

        return {
            songs,
            error,
            isEmpty,
            select,
            search,
            filteredSongs,
            load,
            input,
            inputFocus,
            inputBlur,
        };
    },
};
</script>

<style>
.search {
    margin: 25px 20px;
    transform: translateY(-68vw);
    overflow-y: auto;
}

.search h2 {
    margin-bottom: 20px;
    color: #001f54;
}

.search .songs {
    height: 55vh;
    padding-top: 2px;
    overflow-y: auto;
}

.search-form {
    display: flex;
    position: relative;
    width: 97%;
    height: 46px;
    margin: 20px auto 0;
    border: 1px solid #cfe4e9;
    border-radius: 12px;
}

.search-form input {
    flex-basis: 70%;
    border: none;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    padding-left: 14px;
    font-family: "Lato", "sans-serif";
    font-size: 18px;
    color: #001f54;
    background-color: transparent;
}

.search-form select {
    flex-basis: 30%;
    border: none;
    border-left: 2px solid rgba(0, 31, 84, 0.5);
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    padding-top: 12px;
    padding-left: 16px;
    font-family: "Lato", "sans-serif";
    font-size: 16px;
    color: #001f54;
    background-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.search-form input:focus,
.search-form select:focus {
    outline: none;
    border: 2px solid #1282a2;
}

.search-form svg {
    position: absolute;
    top: 24%;
    right: 9px;
    font-size: 20px;
    color: #001f54;
    z-index: -1;
}

.search-form span {
    position: absolute;
    top: 10%;
    right: 9%;
    font-size: 12px;
    color: rgba(0, 31, 84, 0.5);
    z-index: -1;
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

.no-match {
    font-size: 20px;
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
    .search .songs {
        height: 43vh;
    }
}

@media (max-height: 660px) and (orientation: portrait) {
    .search .songs {
        height: 40vh;
    }
    .search-form {
        margin: 23px auto 0;
    }
}

@media (min-width: 1025px) and (orientation: landscape) {
    .search {
        transform: translateY(-255px);
    }

    .search .songs::-webkit-scrollbar {
        display: none;
    }

    .search .songs {
        height: 447px;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
}
</style>
