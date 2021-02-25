import {
  tableOfContents,
  tableOfContentsClick,
  exitTableOfContents,
} from "../utils";

export const activateTableOfContents = (): void => {
  const tocSlideInSlideOut = () => {
    const isOpen = tableOfContents?.classList.contains("toc-slide-in");

    tableOfContents?.setAttribute(
      "class",
      isOpen ? "toc-slide-out" : "toc-slide-in"
    );
  };

  tableOfContentsClick?.addEventListener("click", tocSlideInSlideOut);

  exitTableOfContents?.addEventListener("click", tocSlideInSlideOut);
};
