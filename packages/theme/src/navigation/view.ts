import { store, getContext } from "@wordpress/interactivity";

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
  callbacks: {
    menuChanged: () => {
      state.menuOpen
        ? document.body.classList.add("menu-open")
        : document.body.classList.remove("menu-open");
    },
  },
});
