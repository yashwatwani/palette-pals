# 🎨 Palette Pals — website

A static site for the Palette Pals duo (Hitanshi Watwani & Ashmeet Bharaj): murals, sculpted
relief, live wedding painting, doodle walls and workshops.

Plain HTML, CSS and JavaScript. **No build step, no framework, no npm install.** You can open
the files directly, and hosting is free.

---

## Pages

| File | What it is |
|------|-----------|
| `index.html`   | Home — hero, services, horizontal "selected work" reel, about, process, testimonials |
| `work.html`    | Full gallery, filterable, with a lightbox |
| `about.html`   | The story and the two artists |
| `contact.html` | Enquiry form, contact details, FAQs |
| `assets/js/data.js`  | **The project catalogue.** Titles, descriptions and photo lists live here |
| `assets/css/site.css`| All styling. Colours and fonts are at the very top |
| `assets/js/site.js`  | Menu, scroll effects, gallery, lightbox |

---

## ✏️ Making changes

### Change a project title or description
Everything on the Work page is generated from `assets/js/data.js`. Find the project and edit it:

```js
{
  "slug": "bombay-deli",
  "title": "Bombay Deli",              // ← shows under the photo
  "place": "Cafe, The Everyday Eatery",// ← the small grey line
  "cat": ["mural"],                    // ← which filter tab it appears under
  "blurb": "The whole city folded…",   // ← text in the lightbox
  "imgs": [ … ]                        // ← photos, first one is the cover
}
```

Filter tabs are `"mural"`, `"relief"`, `"wedding"`, `"workshop"`. Doodle walls count as murals.
A project can be in more than one, e.g. `"cat": ["mural", "relief"]`.

### Change words on a page
Open the `.html` file, find the sentence, type over it. That is all.

### Change colours or fonts
Top of `assets/css/site.css`:

```css
--flame:  #E2662B;   /* the main orange, from the logo */
--ember:  #BE3A22;   /* the deeper red */
--bone:   #F7F3EA;   /* page background */
--ink:    #17140F;   /* text and dark sections */
```

### ⚠️ After editing CSS or JS
The `.html` files link to `site.css?v=N` and `site.js?v=N`. Bump that number in all four HTML files so browsers pick up your change instead of
showing a cached old copy.

---

## 📷 Adding new photos

Photos must be converted before they go on the site. Originals are 5–15 MB each, which is far
too slow on a phone. Every image is stored twice: a small one for grids, a bigger one for the
lightbox.

Drop your new photos in a folder, then from the project root:

```bash
for f in /path/to/new-photos/*.jpg; do n=$(basename "${f%.*}" | tr 'A-Z ' 'a-z-'); cwebp -q 82 -resize 2000 0 "$f" -o "assets/img/full/$n.webp"; cwebp -q 78 -resize 800 0 "$f" -o "assets/img/thumb/$n.webp"; done
```

That needs `cwebp` (`brew install webp`). If a photo is secretly an iPhone HEIC file renamed to
`.jpg`, convert it first with `sips -s format png in.jpg --out out.png`.

Then add the new slug to the right project in `assets/js/data.js`, with the thumbnail's pixel
size:

```js
{ "s": "your-new-photo", "w": 800, "h": 1067 }
```

The `w` and `h` stop the page jumping around while images load, so please fill them in.

---

## 🚀 It is live

**https://palettepals.netlify.app** — Netlify project `palettepals`, free tier.

To publish changes:

```bash
./build.sh && netlify deploy --prod --dir=dist
```

`build.sh` copies the four pages plus `assets/` into `dist/`. **Always deploy `dist/`, never the
project root** — the root holds `originals/` (181 MB of source photos) that must not be uploaded.

### ⚠️ Before the site goes public on a real domain
Right now `robots.txt` blocks all search engines, deliberately, because `palettepals.netlify.app`
is a temporary address. When the real domain is connected:

1. Delete the `Disallow: /` line in `robots.txt`
2. Put the canonical tag back in all four pages: `<link rel="canonical" href="https://YOURDOMAIN/PAGE">`
3. Recreate `sitemap.xml` with the real domain
4. `./build.sh && netlify deploy --prod --dir=dist`

### The contact form
Netlify has detected the `enquiry` form (name, email, phone, city, service, message).
Submissions appear under Site → Forms.

**⚠️ Nobody is emailed when someone enquires**, because the studio has no email address. You must
check the Netlify dashboard, or set up an inbox and add a notification.

Note: new Netlify sites ship with form detection **off** (`ignore_html_forms: true`). It has been
turned on for this site. If forms ever stop being detected after a change, check that setting first.

## 🚀 Other hosting (free)

**Netlify Drop** is the quickest: go to [app.netlify.com/drop](https://app.netlify.com/drop) and
drag this whole folder in. It is live in about ten seconds. GitHub Pages, Cloudflare Pages and
Vercel all work too. You can point `palettepals.com` at any of them later.

### The contact form
The form uses **Netlify Forms** (free, 100 submissions/month). It does nothing when you open the
file locally — that is expected, and the page says so. Once deployed to Netlify:

1. Site → **Forms** — you will see a form called **enquiry**
2. **Form notifications → Add notification → Email notification**
3. Enter a real inbox and save

Every enquiry then lands in that inbox and in the Netlify dashboard.

---

## 📁 About the photos

`originals/` holds all 88 source photographs, and they **are** committed to git, so the repository
is a real backup. They are not deployed; only the converted copies in `assets/img/` go to the web.

The old `images/`, `murals/`, `marriage/` and `workshop/` folders are gone. They held 839 MB, but
422 MB of that was a single aborted browser download and 236 MB was the same photos saved under
different names. Everything genuinely unique was kept.

The old version of the site is in `_archive/` and can be deleted whenever you like.

---

## Known gaps

- **Live wedding**: only 3 photos. Worth shooting more, it is a high-value service.
- **Workshops**: only 2 photos, so it gets one tile. More would let it have a real section.
- **Testimonials** on the home page are placeholders. Swap in real ones when you have them.

---
Made with 🎨 & ♥
