import Query from "./scripts/modules/Query.js";

const tableOfContentsClick = new Query("#tocClick");
const tableOfContents = new Query("#toc");
const exitTableOfContents = new Query("#tocExit");
const leftNavigation = new Query("#navigateLeft");
const leftNavigationSvg = new Query("#navigateLeft svg");
const rightNavigation = new Query("#navigateRight");
const rightNavigationSvg = new Query("#navigateRight svg");
const timelineViewport = new Query("#timelineViewport");
const minimizeModal = new Query("#minimizeModal");
const imageModal = new Query("#imageModal");
const imageModalShade = new Query("#imageModalShade");

const tocSlideInSlideOut = () => {
  const isOpen = tableOfContents.element.classList.contains("toc-slide-in");

  tableOfContents.element.setAttribute(
    "class",
    isOpen ? "toc-slide-out" : "toc-slide-in"
  );
};

tableOfContentsClick.element.addEventListener("click", tocSlideInSlideOut);

exitTableOfContents.element.addEventListener("click", tocSlideInSlideOut);

const style = window.getComputedStyle(timelineViewport.element);
const width = style.width.replace("px", "");
const widthAsNumber = Math.ceil(width);
let timelineScrollPosition = 0;

const activateNavigationArrows = (newScrollPosition) => {
  if (newScrollPosition >= timelineViewport.element.scrollWidth) {
    rightNavigation.element.style.cursor = "not-allowed";
    rightNavigationSvg.element.style.stroke = "#105377";
  } else if (newScrollPosition <= widthAsNumber) {
    leftNavigation.element.style.cursor = "not-allowed";
    leftNavigationSvg.element.style.stroke = "#105377";
  } else {
    leftNavigation.element.style.cursor = "pointer";
    leftNavigationSvg.element.style.stroke = "white";
    rightNavigation.element.style.cursor = "pointer";
    rightNavigationSvg.element.style.stroke = "white";
  }
};

activateNavigationArrows(0);

leftNavigation.element.addEventListener("click", () => {
  const newScrollPosition = timelineScrollPosition;

  activateNavigationArrows(newScrollPosition);

  if (0 < newScrollPosition) {
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
  const mostRightLengthRounded =
    Math.ceil(timelineViewport.element.scrollWidth / 100) * 100;
  const approachingRightLengthRounded =
    Math.ceil((newScrollPosition + widthAsNumber) / 100) * 100;

  activateNavigationArrows(approachingRightLengthRounded);

  if (approachingRightLengthRounded <= mostRightLengthRounded) {
    timelineScrollPosition = newScrollPosition;

    timelineViewport.element.scroll({
      top: 0,
      left: timelineScrollPosition,
      behavior: "smooth",
    });
  }
});

imageModalShade.element.addEventListener("animationend", (evt) => {
  if (evt.currentTarget.classList.contains("galleryFadeOut")) {
    evt.currentTarget.classList.remove("galleryFadeOut");
  }
});

minimizeModal.element.addEventListener("click", () => {
  imageModalShade.element.classList.remove("galleryFadeIn");
  imageModalShade.element.classList.add("galleryFadeOut");
});

document.querySelectorAll("#photos figure").forEach((figure) => {
  figure.addEventListener("click", (evt) => {
    const imageInModal = evt.currentTarget.cloneNode(true);

    imageModalShade.element.classList.remove("galleryFadeOut");
    imageModalShade.element.classList.add("galleryFadeIn");

    imageModal.element.innerHTML = "";
    imageModal.element.appendChild(imageInModal);
  });
});
