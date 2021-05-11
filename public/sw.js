/**
 * for reference
 * https://gohugohq.com/howto/go-offline-with-service-worker/
 * http://www.favicomatic.com/
 */
const CACHE = "wedding_announcement_cache_v1.9.6";

const FONT_PATH = "/fonts";
const IMG_PATH = "/images";

const STYLE_FILES = [
  `${FONT_PATH}/Alifiyah.otf`,
  `${FONT_PATH}/ZillaSlab-LightItalic.ttf`,
  `${FONT_PATH}/ZillaSlab-Light.ttf`,
  `${FONT_PATH}/ZillaSlab-Regular.ttf`,
  `./dist/main.min.css`,
];

const IMG_FILES = [
  `${IMG_PATH}/walk_in_the_park.webp`,
  `${IMG_PATH}/white_brushed_metal.webp`,
  `${IMG_PATH}/food_fight.webp`,
  `${IMG_PATH}/fair_fun.webp`,
  `${IMG_PATH}/andrew_patriarchs.webp`,
  `${IMG_PATH}/hole_in_the_wall.webp`,
  `${IMG_PATH}/zion_observation.webp`,
  `${IMG_PATH}/bad_news_broken.webp`,
  `${IMG_PATH}/surgery.webp`,
  `${IMG_PATH}/dino_hunt.webp`,
  `${IMG_PATH}/fancy_pose.webp`,
  `${IMG_PATH}/engaged_with_butterflies.webp`,
];

const SCRIPT_FILES = ["./dist/index.min.js"];

self.addEventListener("install", (evt) =>
  evt.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(["/", ...STYLE_FILES, ...IMG_FILES]))
      .catch((err) => console.error(err))
  )
);

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((resp) => resp || fetch(event.request))
      .catch((err) => console.error(err))
  );
});

self.addEventListener("activate", (evt) =>
  evt.waitUntil(
    caches
      .keys()
      .then((keyList) =>
        Promise.all(keyList.map((key) => key !== CACHE && caches.delete(key)))
      )
      .catch((err) => console.error(err))
  )
);
