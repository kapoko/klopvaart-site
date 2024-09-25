import { store } from "@wordpress/interactivity";

const navStore = store("navigation", {
    state: {
        menuOpen: false,
    },
    actions: {
        menuToggle() {
            navStore.state.menuOpen = !navStore.state.menuOpen;
        },
    },
    callbacks: {
        log() {
            console.log(`menuOpen: ${navStore.state.menuOpen}`);
        },
    },
});
