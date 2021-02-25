export const query = (selector: string): HTMLElement | null =>
  document.querySelector(selector);

export const tableOfContentsClick: HTMLElement | null = query("#tocClick");
export const tableOfContents: HTMLElement | null = query("#toc");
export const exitTableOfContents: HTMLElement | null = query("#tocExit");
export const leftNavigation: HTMLElement | null = query("#navigateLeft");
export const leftNavigationSvg: HTMLElement | null = query("#navigateLeft svg");
export const rightNavigation: HTMLElement | null = query("#navigateRight");
export const rightNavigationSvg: HTMLElement | null = query(
  "#navigateRight svg"
);
export const timelineViewport: HTMLElement | null = query("#timelineViewport");
export const minimizeModal: HTMLElement | null = query("#minimizeModal");
export const imageModal: HTMLElement | null = query("#imageModal");
export const imageModalShade: HTMLElement | null = query("#imageModalShade");

export const clearChildren = (parent: HTMLElement | null) => {
  while (parent?.firstChild) {
    const lastChild: Node = parent.lastChild as Node;
    parent.removeChild(lastChild);
  }
};
