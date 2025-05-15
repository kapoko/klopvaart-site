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

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

window.addEventListener("load", () => {
  const scrollManager = createScrollManager();

  const scrollElements = document.querySelectorAll<HTMLElement>(
    "[data-scrollparallax]",
  );
  for (const el of [...scrollElements]) {
    const scrollSpeed = Number.parseFloat(
      el.getAttribute("data-scrollparallax") as string,
    );

    el.style.right = `${randomIntFromInterval(-20, 0)}vw`;
    el.style.visibility = "visible";

    const update = (value: number) => {
      el.style.transform = `translate3d(0, ${value * scrollSpeed}px, 0)`;
    };

    scrollManager.add(update);
  }
});
