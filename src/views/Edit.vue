<template>
    <div>
        <CircleTop class="circleup" />
        <Title class="titleup" />
        <Error v-if="error" />
        <div v-if="song">
            <transition name="switch" mode="out-in">
                <div v-if="!editing" class="edit">
                    <h2>Edit song:</h2>
                    <form @submit.prevent="handleSubmit">
                        <label>Song title:</label>
                        <input
                            ref="input"
                            @focus="inputFocus"
                            @blur="inputBlur"
                            v-model="title"
                            type="text"
                            required
                        />
                        <label>Artist:</label>
                        <input
                            ref="input"
                            @focus="inputFocus"
                            @blur="inputBlur"
                            v-model="artist"
                            type="text"
                            required
                        />
                        <div class="genre-bpm-wrap">
                            <div class="genre">
                                <label>Genre:</label>
                                <input
                                    ref="input"
                                    @focus="inputFocus"
                                    @blur="inputBlur"
                                    v-model="genre"
                                    type="text"
                                    required
                                />
                            </div>
                            <div class="bpm">
                                <label>BPM:</label>
                                <input
                                    ref="input"
                                    @focus="inputFocus"
                                    @blur="inputBlur"
                                    v-model="bpm"
                                    type="number"
                                    required
                                    placeholder="number"
                                />
                            </div>
                        </div>
                        <label>Lyrics:</label>
                        <textarea
                            ref="input"
                            @focus="inputFocus"
                            @blur="inputBlur"
                            v-model="lyrics"
                            required
                            placeholder="Please insert the song lyrics.&#10;&#10;Remember to divide parts of the lyrics (like verse, chorus) with ENTERs for a better look."
                        ></textarea>
                        <button>Accept</button>
                    </form>
                </div>
                <div class="editing" v-else>Song edited!</div></transition
            >
        </div>
    </div>
</template>

<script>
import Error from "../components/Error";
import getSong from "../composables/getSong";
import { useRoute, useRouter } from "vue-router";

import { ref } from "vue";
import { projectFirestore, timestamp } from "../firebase/config";
import CircleTop from "../components/CircleTop";
import Logo from "../components/Logo";
import Title from "../components/Title";

export default {
    components: { CircleTop, Logo, Title, Error },
    setup(props, context) {
        const title = ref(null);
        const artist = ref(null);
        const genre = ref(null);
        const bpm = ref(null);
        const lyrics = ref(null);
        const editing = ref(false);

        const router = useRouter();
        const route = useRoute();
        const { error, song, load } = getSong(route.params.id);

        const loadSongData = async () => {
            await load();
            title.value = song.value.title;
            artist.value = song.value.artist;
            genre.value = song.value.genre;
            bpm.value = song.value.bpm;
            lyrics.value = song.value.lyrics;
        };

        loadSongData();

        const handleSubmit = async () => {
            const post = {
                title: title.value,
                artist: artist.value,
                genre: genre.value,
                bpm: parseInt(bpm.value),
                lyrics: lyrics.value,
                timeStamp: timestamp(),
            };

            const res = await projectFirestore
                .collection("songs")
                .doc(route.params.id)
                .update(post);

            editing.value = true;

            setTimeout(() => {
                editing.value = false;
                router.go(-1);
            }, 1500);

            [
                title.value,
                artist.value,
                genre.value,
                bpm.value,
                lyrics.value,
            ] = "";
        };

        // handle navbar hide/show on input focus/blur

        const input = ref(null);
        const inputFocus = () => {
            context.emit("inputFocus");
        };
        const inputBlur = () => {
            context.emit("inputBlur");
        };

        return {
            title,
            artist,
            genre,
            bpm,
            lyrics,
            handleSubmit,
            editing,
            error,
            song,
            loadSongData,
            input,
            inputFocus,
            inputBlur,
        };
    },
};
</script>

<style>
.edit * {
    display: block;
}

.edit {
    margin: 25px 20px;
    transform: translateY(-68vw);
    color: #001f54;
    font-weight: bold;
}

.edit h2 {
    margin-bottom: 20px;
}

.edit label {
    margin: 12px 0;
    font-size: 18px;
}

.edit input {
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

.edit input:focus {
    outline: none;
    border: 2px solid #1282a2;
}

.edit textarea {
    resize: none;
    width: 85%;
    height: 120px;
    margin: 0 auto;
    border: 1px solid #cfe4e9;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    font-family: "Lato", "sans-serif";
    font-size: 14px;
    color: #001f54;
}

.edit textarea:focus {
    outline: none;
    border: 2px solid #1282a2;
}

.edit button {
    width: 100px;
    margin: 28px auto;
    border: none;
    border-radius: 12px;
    padding: 9px 0;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    font-family: "Lato", "sans-serif";
    font-size: 20px;
    color: #fefcfb;
    background-color: #1282a2;
}

.edit button:focus {
    outline: none;
}

.edit .genre-bpm-wrap {
    display: flex;
}

.edit .genre,
.edit .bpm {
    flex-basis: 50%;
}

.edit .bpm input::placeholder {
    font-size: 14px;
}

.editing {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    font-size: 32px;
    color: #28c07b;
    font-weight: bold;
    text-align: center;
}

.circleup {
    transform: translate(-50%, -68%);
}

.titleup {
    top: 50px;
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
    .edit form {
        height: 53vh;
        overflow: auto;
    }
}

@media (max-height: 660px) and (orientation: portrait) {
    .edit form {
        height: 50vh;
        overflow: auto;
    }
}

@media (min-width: 1025px) and (orientation: landscape) {
    .edit {
        transform: translateY(-255px);
    }

    .edit button {
        cursor: pointer;
    }

    .edit .bpm input::-webkit-outer-spin-button,
    .edit .bpm input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
}
</style>
