<template>
    <div>
        <CircleTop class="circleup" />
        <Title class="titleup" />
        <transition name="switch" mode="out-in">
            <div v-if="!adding" class="add">
                <h2>Add a new song:</h2>
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
                    <button>Add</button>
                </form>
            </div>
            <div class="adding" v-else>Song added!</div>
        </transition>
    </div>
</template>

<script>
import { ref } from "vue";
import { projectFirestore, timestamp } from "../firebase/config";
import CircleTop from "../components/CircleTop";
import Logo from "../components/Logo";
import Title from "../components/Title";

export default {
    components: { CircleTop, Logo, Title },
    setup(props, context) {
        const title = ref("");
        const artist = ref("");
        const genre = ref("");
        const bpm = ref("");
        const lyrics = ref("");
        const adding = ref(false);

        const handleSubmit = async () => {
            const post = {
                title: title.value,
                artist: artist.value,
                genre: genre.value,
                bpm: parseInt(bpm.value),
                lyrics: lyrics.value,
                timeStamp: timestamp(),
            };

            const res = await projectFirestore.collection("songs").add(post);

            adding.value = true;

            setTimeout(() => {
                adding.value = false;
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
            adding,
            input,
            inputFocus,
            inputBlur,
        };
    },
};
</script>

<style>
.add * {
    display: block;
}

.add {
    margin: 25px 20px;
    transform: translateY(-68vw);
    color: #001f54;
    font-weight: bold;
}

.add h2 {
    margin-bottom: 20px;
}

.add label {
    margin: 12px 0;
    font-size: 18px;
}

.add input {
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

.add input:focus {
    outline: none;
    border: 2px solid #1282a2;
}

.add textarea {
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

.add textarea:focus {
    outline: none;
    border: 2px solid #1282a2;
}

.add button {
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

.add button:focus {
    outline: none;
}

.genre-bpm-wrap {
    display: flex;
}

.add .genre,
.add .bpm {
    flex-basis: 50%;
}

.add .bpm input::placeholder {
    font-size: 14px;
}

.adding {
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
    .add form {
        height: 53vh;
        overflow: auto;
    }
}

@media (max-height: 660px) and (orientation: portrait) {
    .add form {
        height: 50vh;
        overflow: auto;
    }
}

@media (min-width: 1025px) and (orientation: landscape) {
    .add {
        transform: translateY(-255px);
    }

    .add button {
        cursor: pointer;
    }

    .add .bpm input::-webkit-outer-spin-button,
    .add .bpm input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    .add .bpm input[type="number"] {
        -moz-appearance: textfield;
    }
}
</style>
