import Components from "../classes/Components";
import { each } from "lodash";
import GSAP from "gsap";
import imagesLoaded from "imagesloaded";
import split from "../utils/splittext";

export default class Preloader extends Components {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader__text",
        number: ".preloader__number__text",
        images: document.querySelectorAll("img"),
      },
    });

    split(this.elements.title, "<br>");
    split(this.elements.title, "<br>");

    this.elements.titleSpans =
      this.elements.title.querySelectorAll("span span");

    this.length = 0;
    this.createLoader();
  }

  createLoader() {
    if (this.elements.images) {
      const imgLoad = imagesLoaded(document.body);

      imgLoad.on("done", () => {
        this.onLoad();
      });

      imgLoad.on("progress", () => {
        this.onProgress(imgLoad.images.length);
      });
    }
  }

  onProgress(length) {
    this.length += 1;
    const percent = this.length / length;
    this.elements.number.innerHTML = `${Math.round(percent * 100)}%`;
  }

  onLoad() {
    this.animeOut = GSAP.timeline({ delay: 1 });

    this.animeOut.to(this.elements.titleSpans, {
      duration: 3,
      ease: "expo.inOut",
      stagger: 0.3,
      y: "100%",
    });

    this.animeOut.to(
      this.elements.number,
      {
        delay: 2,
        duration: 1.5,
        ease: "expo.out",
        y: "100%",
      },
      "-=3"
    );

    this.animeOut.to(this.element, {
      duration: 1.5,
      ease: "expo.out",
      backgroundColor: "#ffff",
      opacity: 0,
    }),
      "<-=1";

    this.animeOut.call((_) => {
      this.emit("completed");
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element)
  }
}
