import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { projectAuth } from "./firebase/config";

// import FontAwesome icons

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faPowerOff,
    faTimes,
    faHome,
    faPlusCircle,
    faSearch,
    faSortDown,
    faStop,
    faPlay,
    faPause,
    faMinus,
    faPlus,
    faArrowCircleLeft,
    faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
    faPowerOff,
    faTimes,
    faHome,
    faPlusCircle,
    faSearch,
    faSortDown,
    faStop,
    faPlay,
    faPause,
    faMinus,
    faPlus,
    faArrowCircleLeft,
    faEdit
);

// start app

let app;

projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .use(router)
            .component("font-awesome-icon", FontAwesomeIcon)
            .mount("#app");
    }
});
