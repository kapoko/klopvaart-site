import { store, getElement } from "@wordpress/interactivity";

type State = {
  menuOpen: boolean;
  refs: {
    box: HTMLElement | undefined;
  };
};

let handleOutsideClick: EventListener;

const { state } = store("navigation", {
  state: {} as State,
  actions: {
    menuToggle() {
      state.menuOpen = !state.menuOpen;
    },
  },
  callbacks: {
    menuChanged: () => {
      const { ref } = getElement();

      if (!handleOutsideClick) {
        handleOutsideClick = (e: Event) => {
          if (ref && e.target instanceof Node && !ref.contains(e.target)) {
            state.menuOpen = false;
          }
        };
      }

      if (state.menuOpen) {
        document.body.classList.add("menu-open");
        document.addEventListener("click", handleOutsideClick);
      } else {
        document.body.classList.remove("menu-open");
        document.removeEventListener("click", handleOutsideClick);
      }
    },
  },
});
