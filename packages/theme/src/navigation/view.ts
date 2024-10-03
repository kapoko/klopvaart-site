import { store } from "@wordpress/interactivity";

type State = {
  menuOpen: boolean;
};

const { state } = store("navigation", {
  state: {} as State,
  actions: {
    menuToggle() {
      state.menuOpen = !state.menuOpen;
    },
  },
});
