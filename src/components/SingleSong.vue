<template>
    <div class="song">
        <router-link
            :to="{
                name: 'Song',
                params: { id: song.id },
            }"
            class="song-link"
        >
            <div @click.once="setTimestamp" class="song-details">
                <div class="song-group1">
                    <div class="song-title">
                        {{ song.title }}
                    </div>
                    <div class="song-artist">{{ song.artist }}</div>
                </div>
                <div class="song-group2">
                    <div class="song-genre">{{ song.genre }}</div>
                    <div class="song-bpm">BPM: {{ song.bpm }}</div>
                </div>
            </div>
        </router-link>
        <div class="panel">
            <div class="delete-icon">
                <font-awesome-icon
                    @click="handleDelete"
                    :icon="['fas', 'times']"
                />
            </div>
            <div class="edit-icon">
                <router-link
                    :to="{
                        name: 'Edit',
                        params: { id: song.id },
                    }"
                >
                    <font-awesome-icon :icon="['fas', 'edit']"
                /></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { timestamp } from "../firebase/config";
import { projectFirestore } from "../firebase/config";

export default {
    props: ["song"],
    setup(props, context) {
        // handle song delete

        const handleDelete = async (e) => {
            if (confirm("Are you sure you want to delete this song?")) {
                e.target.parentNode.parentNode.parentNode.parentNode.remove();
                await projectFirestore
                    .collection("songs")
                    .doc(props.song.id)
                    .delete();
                context.emit("delete");
            } else return;
        };

        // update song's timestamp upon clicking at the song

        const setTimestamp = async () => {
            const time = timestamp();

            const res = await projectFirestore
                .collection("songs")
                .doc(props.song.id)
                .update({ timeStamp: time });
        };

        return { handleDelete, setTimestamp };
    },
};
</script>

<style>
a.song-link {
    display: flex;
    width: 96%;
    text-decoration: none;
}

.song {
    display: flex;
    height: 60px;
    margin-bottom: 15px;
    border-radius: 12px;
    padding: 7px 13px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
    background-color: #cfe4e9;
    font-weight: bold;
}

.song-details {
    display: flex;
    width: 100%;
}

.song-group1 {
    flex-basis: 58%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 58%;
    padding-right: 13px;
}

.song-group2 {
    flex-basis: 42%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    max-width: 42%;
    border-left: 1px solid;
    padding: 0 13px;
    color: rgba(0, 31, 84, 0.5);
}

.song-title {
    font-size: 18px;
    color: #001f54;
}

.song-artist {
    padding-left: 24px;
    color: rgba(0, 31, 84, 0.5);
}

.song-title::-webkit-scrollbar,
.song-artist::-webkit-scrollbar,
.song-genre::-webkit-scrollbar,
.song-bpm::-webkit-scrollbar {
    display: none;
}

.song-title,
.song-artist,
.song-genre,
.song-bpm {
    overflow-x: auto;
    white-space: nowrap;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.delete-icon svg {
    color: rgba(0, 31, 84, 0.5);
}

.edit-icon svg {
    color: rgba(0, 31, 84, 0.5);
    font-size: 12px;
}

@media (min-width: 1025px) and (orientation: landscape) {
    .delete-icon,
    .edit-icon {
        cursor: pointer;
    }

    .delete-icon svg,
    .edit-icon svg {
        transition: 0.2s;
    }
    .delete-icon:hover svg,
    .edit-icon:hover svg {
        color: #001f54;
    }
}
</style>
