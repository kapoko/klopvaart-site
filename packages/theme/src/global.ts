import "./global.css";

type Callback = (scrollPos: number) => void;

const createScrollManager = () => {
  let callbacks: Callback[] = [];
  let scrollPosition = -1;
  let animatedKilled = false;

  const animate = () => {
    requestAnimationFrame(onScroll);
  };

  function onScroll() {
    if (animatedKilled) return;

    if (scrollPosition !== window.scrollY) {
      window.removeEventListener("scroll", animate);
      scrollPosition = window.scrollY;
      for (const callback of callbacks) {
        callback(scrollPosition);
      }
      animate();
    } else {
      window.addEventListener("scroll", animate);
    }
  }

  animate();

  return {
    add: (cb: Callback) => {
      callbacks = [...callbacks, cb];
    },
    remove: (cb: Callback) => {
      callbacks = callbacks.filter((value) => value !== cb);
    },
    destroy: () => {
      animatedKilled = true;
      window.removeEventListener("scroll", animate);
    },
  };
};

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", (_) => {
  const scrollManager = createScrollManager();

  const scrollElements = document.querySelectorAll("[data-scrollparallax]");
  for (const el of [...scrollElements]) {
    const scrollSpeed = Number.parseFloat(
      el.getAttribute("data-scrollparallax"),
    );

    el.style.right = `${randomIntFromInterval(0, 20)}vw`;
    el.style.visibility = "visible";

    const update = (value: number) => {
      el.style.transform = `translate3d(0, ${value * scrollSpeed}px, 0)`;
    };

    scrollManager.add(update);
  }
});
