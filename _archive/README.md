# 🎨 Palette Pals — website

A modern, artsy website for a creative duo (Hitanshi Watwani & Ashmeet Bharaj) doing **live wedding painting, 2D/3D murals, doodle booths & workshops**. Tagline: *Value meets Duo.*

The header/footer use the real **Palette Pals logo** (`images/logo-mark.jpg`). The Work gallery is populated with real mural photos; **Live Wedding** and **Workshops** show "coming soon" tiles until you add photos.

Built as a plain static site (HTML + CSS + a little JavaScript) — no build tools, no frameworks. It works by just opening the files, and it's free to host.

## Pages
| File | What it is |
|------|-----------|
| `index.html` | Home — hero, services, about preview, work preview, testimonials, links to everything |
| `work.html` | Gallery with filter tabs (All / Murals / Portraits / Live Wedding) |
| `about.html` | The story, the two artists, and how you work |
| `contact.html` | Contact details, socials, and an enquiry form |
| `css/style.css` | All the styling (colours, fonts, layout) |
| `js/main.js` | Menu, scroll animations, contact form |

## ✏️ How to make it yours (no coding needed for most)

1. **Add photos.** Create a folder called `images/` and drop your photos in. Then replace each grey placeholder box. In the HTML you'll see lines like:
   ```html
   <div class="placeholder-img">Mural<br>images/g-1.jpg</div>
   ```
   Swap that whole line for:
   ```html
   <img src="images/g-1.jpg" alt="Mural in a living room" />
   ```
2. **Change the text.** Just find the words on the page in the `.html` file and type over them — names, bios, the story, testimonials.
3. **Update contact details.** In `contact.html` change the email, phone and WhatsApp number. Also update the email in two places:
   - `data-email="..."` on the `<form>` tag
   - the footer links across all four pages
4. **Instagram** is already linked to `@palette._.pals` everywhere.

### The contact form (Netlify Forms)
The form is wired up to **Netlify Forms** — free, up to 100 submissions/month. Enquiries are saved in your Netlify dashboard and emailed to you.

**Important:** this only works once the site is deployed to Netlify (it won't work opening the file locally). After you deploy:
1. In Netlify go to your site → **Forms** — you'll see a form called **enquiry**.
2. Click **Form notifications → Add notification → Email notification**.
3. Enter **WhatsApp +91 84354 69050** and save.

That's it — every enquiry now lands in that inbox and in the dashboard. (No number is collected; just name, email, service and message.)

## 🎨 Colours & fonts
Everything lives at the top of `css/style.css` under `:root`. Change one line and it updates site-wide, e.g.:
```css
--terracotta: #C85F3C;   /* main accent colour */
```
Fonts are **Fraunces** (headings) + **Inter** (body), loaded free from Google Fonts.

## 🚀 Publishing it (all free)
Easiest options:
- **Netlify Drop** — go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this whole folder in. Live in seconds.
- **GitHub Pages** — push the folder to a repo, enable Pages in settings.
- **Cloudflare Pages / Vercel** — connect the folder, done.

You can point a custom domain (e.g. `palettepals.com`) at any of these later.

---
Made with 🎨 & ♥
