<template>
    <div>
        <CircleTop class="circleup" />
        <Title class="titleup" />
        <Error v-if="error" />
        <transition name="switch" mode="out-in">
            <div v-if="song" class="song-lyrics">
                <h2>{{ song.title }}</h2>
                <div class="artist-bpm-info">
                    <p>
                        by {{ song.artist }}<span>BPM: {{ song.bpm }}</span>
                    </p>
                </div>
                <p ref="lyrics" class="lyrics-container">
                    {{ song.lyrics }} <span class="end">--- the end ---</span>
                </p>
            </div>
            <div v-else>
                <Spinner v-if="!error" />
            </div>
        </transition>
        <transition name="switch" mode="out-in">
            <div v-if="playable" class="player">
                <div class="play-control">
                    <div @click="handleStop" class="stop">
                        <font-awesome-icon :icon="['fas', 'stop']" />
                    </div>
                    <div
                        @click="handlePlay(speed)"
                        class="play"
                        :class="{ playing: isPlaying }"
                    >
                        <font-awesome-icon :icon="['fas', 'play']" />
                    </div>
                    <div
                        @click="handlePause"
                        class="pause"
                        :class="{ paused: isPaused }"
                    >
                        <font-awesome-icon :icon="['fas', 'pause']" />
                    </div>
                </div>
                <div class="speed-control">
                    <div @click="handleTempoDown" class="speed-minus">
                        <font-awesome-icon :icon="['fas', 'minus']" />
                    </div>
                    <div @click="handleTempoUp" class="speed-plus">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </div>
                    <span>speed: x {{ multiplier }}</span>
                </div>
            </div>
        </transition>
        <div @click="$router.go(-1)" class="back">
            <font-awesome-icon :icon="['fas', 'arrow-circle-left']" />back
        </div>
        <video ref="video" class="video" loop>
            <source src="../assets/movie.mp4" />
        </video>
    </div>
</template>

<script>
import Error from "../components/Error";
import getSong from "../composables/getSong";
import { useRoute } from "vue-router";
import { computed, onUnmounted, ref } from "vue";

import CircleTop from "../components/CircleTop";
import Logo from "../components/Logo";
import Title from "../components/Title";
import Spinner from "../components/Spinner.vue";

export default {
    components: { CircleTop, Logo, Title, Spinner, Error },
    setup(props, context) {
        // load song data

        const route = useRoute();
        const { error, song, load } = getSong(route.params.id);

        load();

        // ref to dummy video (playing video prevents screen lock on mobile)

        const video = ref(null);

        // check if the lyrics are playable (scrollable) - if yes, show "player"

        const playable = computed(() => {
            if (lyrics.value) {
                if (lyrics.value.scrollHeight > lyrics.value.clientHeight) {
                    return true;
                }
            }
        });

        // handle auto-scrolling

        const lyrics = ref(null);
        const playbtn = ref(null);
        const isPlaying = ref(false);
        const isPaused = ref(false);

        const speed = ref(360);
        const initialSpeed = speed.value;

        const multiplier = ref(1);
        const initialMultiplier = multiplier.value;

        let indexInterval;

        const handlePlay = (speedValue) => {
            if (!indexInterval) {
                video.value.play();
                isPlaying.value = true;
                isPaused.value ? (isPaused.value = false) : null;
                indexInterval = setInterval(() => {
                    lyrics.value.scrollBy(0, 1);
                    if (
                        lyrics.value.scrollTop +
                            lyrics.value.clientHeight +
                            1 >=
                        lyrics.value.scrollHeight
                    ) {
                        clearInterval(indexInterval);
                        indexInterval = null;
                        isPlaying.value = false;
                        speed.value = initialSpeed;
                        multiplier.value = initialMultiplier;
                    }
                }, Math.floor((100 / song.value.bpm) * speedValue));
            }
        };

        const handlePause = () => {
            if (isPlaying.value) {
                clearInterval(indexInterval);
                indexInterval = null;
                isPlaying.value = false;
                isPaused.value = true;
            }
        };

        const handleStop = () => {
            if (isPlaying.value || isPaused.value) {
                clearInterval(indexInterval);
                lyrics.value.scrollTop = 0;
                indexInterval = null;
                isPlaying.value
                    ? (isPlaying.value = false)
                    : (isPaused.value = false);
                speed.value = initialSpeed;
                multiplier.value = initialMultiplier;
                video.value.pause();
                video.value.currentTime = 0;
            }
        };

        const handleTempoUp = () => {
            if (isPlaying.value && multiplier.value < 8) {
                clearInterval(indexInterval);
                indexInterval = null;
                speed.value /= 2;
                multiplier.value *= 2;
                handlePlay(speed.value);
            }
        };

        const handleTempoDown = () => {
            if (isPlaying.value && multiplier.value > 1 / 8) {
                clearInterval(indexInterval);
                indexInterval = null;
                speed.value *= 2;
                multiplier.value /= 2;
                handlePlay(speed.value);
            }
        };

        onUnmounted(() => {
            context.emit("songUnmounted");
            if (indexInterval) clearInterval(indexInterval);
        });

        return {
            error,
            song,
            playable,
            handlePlay,
            handleStop,
            handlePause,
            handleTempoUp,
            handleTempoDown,
            lyrics,
            playbtn,
            indexInterval,
            isPlaying,
            isPaused,
            speed,
            multiplier,
            video,
        };
    },
    created() {
        this.$emit("songCreated");
    },
};
</script>

<style>
.song-lyrics {
    margin: 25px 20px;
    transform: translateY(-68vw);
    color: #001f54;
    font-weight: bold;
}

.song-lyrics h2 {
    text-align: center;
}

.artist-bpm-info {
    font-size: 14px;
    text-align: center;
    color: rgba(0, 31, 84, 0.5);
}

.artist-bpm-info p {
    position: relative;
}

.artist-bpm-info span {
    position: absolute;
    right: 0;
}

.lyrics-container {
    height: 56vh;
    margin-top: 22px;
    overflow-y: auto;
    font-size: 17px;
    white-space: pre-wrap;
}

.end {
    display: block;
    margin-top: 5px;
    color: rgba(0, 31, 84, 0.5);
}

.player {
    display: flex;
    position: absolute;
    bottom: 11%;
    width: 100%;
    color: #034078;
    font-size: 24px;
}

.play-control {
    flex-basis: 50%;
    display: flex;
    justify-content: center;
}

.speed-control {
    position: relative;
    flex-basis: 50%;
    display: flex;
    justify-content: center;
}

.play-control *,
.speed-control * {
    margin: 0 4px;
}

.speed-control span {
    position: absolute;
    bottom: -15px;
    font-size: 14px;
}

.playing,
.paused {
    color: #fa795e;
    transition: 0.2s;
}

.back {
    position: absolute;
    bottom: 4%;
    left: 50%;
    transform: translateX(-50%);
    color: #1282a2;
    font-weight: bold;
}

.back svg {
    margin-right: 3px;
    font-size: 20px;
    transform: translateY(10%);
}

.video {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    opacity: 0;
    z-index: -99;
}

/* animations */

.switch-enter-from,
.switch-leave-to {
    opacity: 0;
}

.switch-enter-active,
.switch-leave-active {
    transition: 0.2s ease-out;
}

/* media queries */

@media (max-height: 790px) and (orientation: portrait) {
    .lyrics-container {
        height: 50vh;
    }

    .player {
        bottom: 11%;
    }
}

@media (max-height: 660px) and (orientation: portrait) {
    .lyrics-container {
        height: 48vh;
    }

    .player {
        bottom: 12%;
    }
}

@media (min-width: 1025px) and (orientation: landscape) {
    .song-lyrics {
        transform: translateY(-255px);
    }

    .lyrics-container::-webkit-scrollbar {
        display: none;
    }

    .lyrics-container {
        height: 455px;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .play-control *,
    .speed-control * {
        cursor: pointer;
    }

    .back {
        cursor: pointer;
    }
}
</style>
