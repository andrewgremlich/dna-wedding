import Query from "./scripts/modules/Query.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}

const tableOfContentsClick = new Query("#tocClick");
const tableOfContents = new Query("#toc");
const exitTableOfContents = new Query("#tocExit");
const leftNavigation = new Query("#navigateLeft");
const rightNavigation = new Query("#navigateRight");
const timelineViewport = new Query("#timelineViewport");

const tocSlideInSlideOut = () => {
  const isOpen = tableOfContents.element.classList.contains("toc-slide-in");

  tableOfContents.element.setAttribute(
    "class",
    isOpen ? "toc-slide-out" : "toc-slide-in"
  );
};

tableOfContentsClick.element.addEventListener("click", tocSlideInSlideOut);

exitTableOfContents.element.addEventListener("click", tocSlideInSlideOut);

// TODO: Take into account the scroll position

const style = window.getComputedStyle(timelineViewport.element);
const width = style.width.replace("px", "");
const widthAsNumber = Math.floor(width);
let timelineScrollPosition = 0;

leftNavigation.element.addEventListener("click", () => {
  const newScrollPosition = timelineScrollPosition;

  if (newScrollPosition > 0) {
    timelineScrollPosition -= widthAsNumber;

    timelineViewport.element.scroll({
      top: 0,
      left: timelineScrollPosition,
      behavior: "smooth",
    });
  }
});

rightNavigation.element.addEventListener("click", () => {
  const newScrollPosition = timelineScrollPosition + widthAsNumber;

  if (
    timelineViewport.element.scrollWidth - widthAsNumber >
    newScrollPosition
  ) {
    timelineScrollPosition = newScrollPosition;

    timelineViewport.element.scroll({
      top: 0,
      left: timelineScrollPosition,
      behavior: "smooth",
    });
  }
});
