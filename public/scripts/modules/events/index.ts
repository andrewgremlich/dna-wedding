import {
  imageModalShade,
  imageModal,
  minimizeModal,
  clearChildren,
} from "../utils";

import { activateTableOfContents } from "./toc";
import { activateTimelineEvents } from "./timeline";

export const activateEvents = (): void => {
  activateTableOfContents();
  activateTimelineEvents();

  imageModalShade?.addEventListener("animationend", (evt) => {
    const element: HTMLElement = evt?.currentTarget as HTMLElement;

    if (element?.classList.contains("galleryFadeOut")) {
      element.classList.remove("galleryFadeOut");
    }
  });

  minimizeModal?.addEventListener("click", () => {
    imageModalShade?.classList.remove("galleryFadeIn");
    imageModalShade?.classList.add("galleryFadeOut");
  });

  document.querySelectorAll("#photos figure").forEach((figure) => {
    figure.addEventListener("click", (evt) => {
      const element: HTMLElement = evt?.currentTarget as HTMLElement;
      const imageInModal = element.cloneNode(true);

      imageModalShade?.classList.remove("galleryFadeOut");
      imageModalShade?.classList.add("galleryFadeIn");

      clearChildren(imageModal);

      imageModal?.appendChild(imageInModal);
    });
  });
};
