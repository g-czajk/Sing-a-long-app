import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getSong = (id) => {
    const song = ref(null);
    const error = ref(null);

    const load = async () => {
        try {
            let res = await projectFirestore
                .collection("songs")
                .doc(id)
                .get();

            if (!res.exists) {
                throw Error("No such song in the library");
            }

            song.value = { ...res.data(), id: res.id };
        } catch (err) {
            console.error(err.message);
            error.value = err.message;
        }
    };

    return { song, error, load };
};

export default getSong;
