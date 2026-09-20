# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this is

The marketing site for **Palette Pals**, a two-artist studio (Hitanshi Watwani & Ashmeet Bharaj)
in Gwalior, Madhya Pradesh doing murals, sculpted relief, live wedding painting, doodle walls and workshops.
Tagline: *Value meets Duo*. Built for the owner's sister; she will edit the text herself, so
**readability beats cleverness** in every file here.

Live at **https://palettepals.netlify.app** (Netlify project `palettepals`, free tier).

## Stack

Plain static HTML, CSS and JavaScript. **No framework, no bundler, no `npm install`.** Do not
introduce a build system, TypeScript, React or a CSS preprocessor without being asked — the whole
point is that a non-developer can open a file and type over the words.

GSAP + ScrollTrigger and Lenis load from CDN with `defer`. Everything they do is an enhancement;
the pages must remain readable and navigable if those fail.

## Layout

```
index.html work.html about.html contact.html   the whole site, 4 pages
assets/css/site.css     all styling; design tokens in :root at the top
assets/js/data.js       THE PROJECT CATALOGUE — titles, blurbs, photo lists
assets/js/site.js       menu, reveals, gallery, lightbox, form
assets/img/full/        2000px WebP, used by the lightbox
assets/img/thumb/       800px WebP, used by every grid and card
build.sh                copies the site into dist/ (a copy, not a compile)
originals/              the 88 source photographs, deduplicated and committed
_archive/               the previous version of the site, reference only
_local-archive/         gitignored: artwork the client pulled, stray documents
```

`work.html` renders its gallery entirely from `data.js`. To change what appears on the Work page,
edit `data.js`, not the HTML.

## Rules that matter

**Deploy `dist/`, never the project root.** The root contains `originals/` (181 MB of source photographs) which must not be published to the web host.

```bash
./build.sh && netlify deploy --prod --dir=dist
```

**`data.js` must assign to `window.PROJECTS`.** It previously used `const PROJECTS`, which creates
a script-scoped binding and is *not* a property of `window`, so the `window.PROJECTS` guards in
`site.js` were silently false and the entire gallery and lightbox rendered nothing, with no console
error. If the gallery is ever empty, check this first.

**Bump the `?v=` query when you edit CSS or JS.** All four pages link `site.css?v=N`,
`site.js?v=N`, `data.js?v=N`. Without a bump, browsers serve a stale cached copy.

**Every image needs `width` and `height`.** Entries in `data.js` carry `w`/`h` and every `<img>`
has the attributes. This prevents layout shift while images load. Do not drop them.

**`.rv` elements start at `opacity: 0`** and are revealed by an IntersectionObserver in `site.js`.
So a JS error can make the page look blank. `site.js` therefore only removes `.no-js` once it can
actually reveal, and has a 2.5s failsafe (`showOnScreen`). Keep that safety net if you refactor.

## Adding photos

Originals are 5–15 MB each and must be converted to two WebP sizes first:

```bash
cwebp -q 82 -resize 2000 0 "in.jpg" -o assets/img/full/slug.webp
cwebp -q 78 -resize 800  0 "in.jpg" -o assets/img/thumb/slug.webp
```

Then add `{"s":"slug","w":800,"h":<thumb height>}` to the right project in `data.js`.

Three traps already hit:

- Some `.jpg` files are actually **iPhone HEIC**. `cwebp` rejects them; run
  `sips -s format png in.jpg --out out.png` first.
- The original folders were **73% duplicates** (193 files, 88 distinct). Hash before assuming
  two filenames are two photos. They have since been deduplicated into `originals/`.
- Many photos are **phone screenshots** with a status bar and black letterboxing baked in.
  Cropping to the largest continuously-lit band removes both; cropping only pure black leaves
  the clock and battery icons visible, which shipped to the live site once.

## Netlify specifics

- The contact form relies on Netlify Forms. New Netlify sites ship with form detection **off**
  (`ignore_html_forms: true`); it has been turned on for this site. If forms stop being detected,
  check that setting before debugging the HTML.
- **Email notification for enquiries is still not set up.** Submissions land in the dashboard only.
- `robots.txt` currently has `Disallow: /` **on purpose**, because `.netlify.app` is a temporary
  address. Do not "fix" this. It gets lifted when a real domain is connected.

## Source of truth for content

Project titles, places, dates and descriptions come from the studio's own
**"Palette Pals Mural Works Portfolio"** PDF (Canva, by Ashmeet Bharaj). Prefer that wording over
anything invented. Facts established from it:

- The studio is in **Gwalior, Madhya Pradesh** — not Delhi. An earlier draft of this site said
  Delhi throughout and it was wrong.
- Both founders hold a BFA from the Government Institute of Fine Arts, Gwalior, plus a month-long
  intensive at Samsara Academy of Arts, Hyderabad.
- Business contact: palettepalss@gmail.com, +91 8435469050 / +91 9770998033, IG @palette._.pals,
  YouTube "Palette Pals".

## State

Done: all four pages, 23 projects with real titles/dates/descriptions, filterable gallery,
lightbox with keyboard and swipe, mobile menu, founders photo on About, asset pipeline, deployed,
form detected (name, email, phone, city, service, message).

Open, roughly in priority order:

1. **Turn on the Netlify email notification** for enquiries — nobody is told about them right now.
2. **Verify the newly-added project photos.** 23 WhatsApp images were sorted into Lord of the
   Sublime, 3D Botanical Mural, The Safari Study, 3D Botanical Flora Relief, Boho Botanical and
   Pop Textured Wall by eye, matched against the PDF descriptions. The groupings are a best guess
   and the studio should confirm them.
3. **Real testimonials.** The three on the home page are placeholders written by Claude and should
   not stay up long.
4. **One location conflict:** the photos named `RESIDENTIAL MURAL IN ROHINI,DELHI` are used for
   "Indian Motifs on a Geometric Wall", which the PDF places in Gwalior. The PDF was followed.
   Worth confirming.
5. **Decide the domain**, then lift the robots block, restore the `<link rel="canonical">` tags in
   all four pages, and recreate `sitemap.xml`.
6. **Photo gaps.** Live wedding has 3 photos and workshops has 1, despite weddings being the
   highest-value service. Doodle has one project.
7. **Possible 3D upgrade.** The original brief was a "3D website". The agreed plan was to ship this
   fast 2.5D version first, then optionally upgrade the hero and gallery to a scroll-driven 3D room
   where murals are mapped onto real walls (React Three Fiber or vanilla Three.js), with this
   version as the mobile fallback. Not started, and not to be started unless asked.

## Tone

Site copy is plain, concrete and slightly dry. It says what things are, admits what is small, and
avoids marketing inflation. Match it. Avoid em dashes.
