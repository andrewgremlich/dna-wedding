import Query from "./scripts/modules/Query.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}

const tableOfContentsClick = new Query("#tocClick");
const tableOfContents = new Query("#toc");
const exitTableOfContents = new Query("#tocExit");

const tocSlideInSlideOut = () => {
  const isOpen = tableOfContents.element.classList.contains("toc-slide-in");

  tableOfContents.element.setAttribute(
    "class",
    isOpen ? "toc-slide-out" : "toc-slide-in"
  );
};

tableOfContentsClick.element.addEventListener("click", tocSlideInSlideOut);

exitTableOfContents.element.addEventListener("click", tocSlideInSlideOut);
