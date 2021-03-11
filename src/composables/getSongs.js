import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getSongs = () => {
    const songs = ref([]);
    const error = ref(null);
    const isEmpty = ref(null);

    const load = async (orderBy, order, limit) => {
        try {
            const res = await projectFirestore
                .collection("songs")
                .orderBy(orderBy, order)
                .limit(limit)
                .get();

            if (res.empty) {
                isEmpty.value = true;
            } else isEmpty.value = false;

            songs.value = res.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
        } catch (err) {
            console.error(err.message);
            error.value = err.message;
        }
    };

    return { songs, error, isEmpty, load };
};

export default getSongs;
