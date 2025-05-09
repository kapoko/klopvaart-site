import "./global.css";

const createScrollManager = () => {
    let callbacks = [];
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
            callbacks.forEach((cb) => cb(scrollPosition));
            animate();
        } else {
            window.addEventListener("scroll", animate);
        }
    }

    animate();

    return {
        add: function(cb) {
            callbacks = [...callbacks, cb];
        },
        remove: function(cb) {
            callbacks = callbacks.filter((value) => value != cb);
        },
        destroy: function() {
            animatedKilled = true;
            window.removeEventListener("scroll", animate);
        },
    };
};

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", (event) => {
    // const log1 = console.log.bind(null, 1);
    const scrollManager = createScrollManager();
    // scrollManager.add(log1);

    const scrollElements = document.querySelectorAll("[data-scrollparallax]");
    for (const el of scrollElements) {
        const scrollSpeed = parseFloat(el.getAttribute("data-scrollparallax"));

        el.style.right = randomIntFromInterval(0, 20) + "vw";
        el.style.visibility = "visible";

        console.log(el);
        const update = (value) => {
            el.style.transform = "translate3d(0, " + value * scrollSpeed +
                "px, 0)";
        };

        scrollManager.add(update);
    }
});
