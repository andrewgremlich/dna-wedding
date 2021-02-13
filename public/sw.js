/**
 * for reference
 * https://gohugohq.com/howto/go-offline-with-service-worker/
 * http://www.favicomatic.com/
 */
const CACHE = "wedding_announcement_cache_v1.1";
const CSS_PATH = "/css";
const FONT_PATH = "/fonts";
const IMG_PATH = "/images";

const STYLE_FILES = [`${CSS_PATH}/fonts.css`, `${CSS_PATH}/styles.css`];

const IMG_FILES = [
  `${IMG_PATH}/walk_in_the_park.webp`,
  `${IMG_PATH}/metal_texture.webp`,
  `${IMG_PATH}/food_fight.webp`,
  `${IMG_PATH}/fair_fun.webp`,
  `${IMG_PATH}/christmas_tree.webp`,
  `${IMG_PATH}/andrew_patriarchs.webp`,
  `${IMG_PATH}/hole_in_the_wall.webp`,
  `${IMG_PATH}/zion_observation.webp`,
  `${IMG_PATH}/bad_news_broken.webp`,
  `${IMG_PATH}/surgery.webp`,
  `${IMG_PATH}/dino_hunt.webp`,
  `${IMG_PATH}/fancy_pose.webp`,
  `${IMG_PATH}/engaged_with_butterflies.webp`,
];

self.addEventListener("install", (evt) =>
  evt.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(["/", ...STYLE_FILES, ...IMG_FILES]))
  )
);

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});

self.addEventListener("activate", (evt) =>
  evt.waitUntil(
    caches
      .keys()
      .then((keyList) =>
        Promise.all(keyList.map((key) => key !== CACHE && caches.delete(key)))
      )
  )
);
