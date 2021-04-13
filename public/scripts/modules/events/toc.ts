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

  document.querySelector("main")?.addEventListener("click", (data) => {
    tableOfContents?.classList.remove("toc-slide-in");
    tableOfContents?.classList.add("toc-slide-out");
  });
};
