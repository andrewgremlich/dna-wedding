import {
  leftNavigation,
  timelineViewport,
  rightNavigation,
  rightNavigationSvg,
  leftNavigationSvg,
} from "../utils";

export const activateTimelineEvents = (): void => {
  if (timelineViewport) {
    let style = window.getComputedStyle(timelineViewport);

    const width: unknown = style.width.replace("px", "") as unknown;
    const widthAsNumber: number = Math.ceil(width as number);
    let timelineScrollPosition = 0;

    const activateNavigationArrows = (newScrollPosition: number) => {
      if (timelineViewport) {
        if (newScrollPosition >= timelineViewport.scrollWidth) {
          rightNavigation?.classList.add("notAllowedNavigation");
          rightNavigationSvg?.classList.add("blendInArrow");
        } else if (newScrollPosition <= widthAsNumber) {
          leftNavigation?.classList.add("notAllowedNavigation");
          leftNavigationSvg?.classList.add("blendInArrow");
        } else {
          leftNavigation?.classList.remove("notAllowedNavigation");
          leftNavigationSvg?.classList.remove("blendInArrow");
          rightNavigation?.classList.remove("notAllowedNavigation");
          rightNavigationSvg?.classList.remove("blendInArrow");
        }
      }
    };

    activateNavigationArrows(0);

    leftNavigation?.addEventListener("click", () => {
      const newScrollPosition = timelineScrollPosition;

      activateNavigationArrows(newScrollPosition);

      if (0 < newScrollPosition) {
        timelineScrollPosition -= widthAsNumber;

        timelineViewport?.scroll({
          top: 0,
          left: timelineScrollPosition,
          behavior: "smooth",
        });
      }
    });

    rightNavigation?.addEventListener("click", () => {
      if (timelineViewport) {
        const newScrollPosition = timelineScrollPosition + widthAsNumber;
        const mostRightLengthRounded =
          Math.ceil(timelineViewport.scrollWidth / 100) * 100;
        const approachingRightLengthRounded =
          Math.ceil((newScrollPosition + widthAsNumber) / 100) * 100;

        activateNavigationArrows(approachingRightLengthRounded);

        if (approachingRightLengthRounded <= mostRightLengthRounded) {
          timelineScrollPosition = newScrollPosition;

          timelineViewport?.scroll({
            top: 0,
            left: timelineScrollPosition,
            behavior: "smooth",
          });
        }
      }
    });
  }
};
