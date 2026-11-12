# Machinery Mall

The Machinery Mall website (machinerymall.netlify.app), converted from plain HTML to React, with a built-in admin panel.

The design is the original one: the same CSS, colours (blue #0071BC, red #E01B22), fonts (Archivo, IBM Plex) and layouts. All 35 industries and their 1,267 product types, the case study, brands and contact details were carried over and can now be edited in the admin.

There is **no separate database**. All content is stored on Vercel itself:

- **On Vercel:** content is stored in **Vercel Blob** (Vercel's built-in file storage): one file for the website content, a separate privately named file for customer enquiries, and the uploaded images.
- **On your computer:** content is saved to `data/content.json` and `data/enquiries.json`, and images to `public/uploads/`.

## Run it locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173. The admin panel is at http://localhost:5173/admin and the local password is `admin123`. To change it, create a `.env` file with `ADMIN_PASSWORD=yourpassword`.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, click **Add New → Project** and import the repository. The default settings (Vite) are correct.
3. In the project's **Settings → Environment Variables**, add:
   - `ADMIN_PASSWORD`: the password for `/admin` (required).
   - `ADMIN_SECRET`: optional. Any long random string; it is used to sign admin logins.
4. Open the project's **Storage** tab, choose **Create → Blob**, and select **Public** access. Connect it to the project with the Production environment ticked. Vercel adds the storage credentials automatically (a `BLOB_STORE_ID` for OIDC, or `BLOB_READ_WRITE_TOKEN`); both work.
5. **Redeploy** so the new settings take effect (Deployments → ⋯ → Redeploy).

Then open `https://your-site.vercel.app/admin` and log in.

Until Blob storage is connected, the site shows the starter content, and saving in the admin shows a message explaining what to connect.

## Pages

| Page | URL | Notes |
| --- | --- | --- |
| Home | `/` | Rotating industries hero, industry grid, featured products, case study, brands, enquiry form |
| About Us | `/about` | Same content as the original |
| Brands We Deal In | `/brands` | Brand groups and logos from the admin |
| Industries We Serve | `/industries` | All industries with A–Z index; `/industries#i-steel` opens one directly |
| Products | `/products`, `/products/<name>` | **New.** Machines with photos, specifications, video and brochure |
| Case Study | `/case-studies`, `/case-studies/<name>` | With one case study, the menu goes straight to it (as before) |
| Contact Us | `/contact` | Working form with photo/PDF upload, map and shop timings |
| Search | `/search?q=…` | **New.** The header search box searches products and every industry's product range |

All "Send Enquiry" forms now work: requirements are saved and appear in Admin → Enquiries.
On phones the site follows the original `mobile.html` design (menu button, search bar, Call / Send Enquiry bar at the bottom).

## What the admin panel can do

| Section | What you can do |
| --- | --- |
| Dashboard | Counts, latest enquiries and a to-do list (placeholder brands, missing photos, opening hours, map) |
| Products | Add, edit and delete products: several photos (drag and drop, reorder, cover photo), name, industry, product range, brand, model, origin, short and full description, specifications table, key features, YouTube/Vimeo video, brochure link, and "featured on the home page" |
| Industries | Edit the 35 industries: name, heading, icon, introduction, product lists (one per line, simple list and/or titled groups), the "Complete solutions" box, and whether the industry appears in the home page grid or rotating hero |
| Case studies | Add, edit and delete case studies: title, summary, facts bar, photos, project, our role, highlight, why it matters, "at a glance" box, linked products and home page teaser |
| Brands | Brand groups with brand names, logos and optional website links |
| Enquiries | Requirements from every form, with region, industry, attached photos/PDFs; set status (new, contacted, closed), add notes, export to CSV |
| Site settings | Phone, WhatsApp, emails, address, shop timings, Google Map, home page hero text and slide timing |

Large photos are resized in the browser before upload (longest side 1800 px), which keeps them fast to load and under Vercel's upload limit.

## Still to fill in (from the original site)

- **Brands:** the 54 tiles are still placeholders (`[BRAND 1]` …). Replace them in Admin → Brands.
- **Opening hours and map:** add them in Admin → Site settings.
- **Products:** three example products are included without photos. Edit them or delete them, and add your own.

## Project structure

```
api/            Vercel serverless functions
  content.js    GET  public content
  login.js      POST admin login
  admin.js      admin read, save and delete (requires login)
  upload.js     image upload (requires login)
  enquiry.js    POST requirement / contact form (with optional attachments)
lib/            server code: storage (Blob or local files), auth, validation
  seed.js       starter content extracted from the original HTML site
server/         local development server (npm run dev)
public/brand/   logo images from the original site
src/            React app
  styles.css    the original site's CSS, plus form and mobile additions at the end
  components/   header, footer, hero slider, enquiry forms, cards
  pages/        public pages (converted from the original HTML pages)
  pages/admin/  admin panel (loaded only when /admin is visited)
```

## Notes

- **Changing the starter content.** Edit `lib/seed.js`. The starter content is only used until the first save; after that the saved content is used.
- **Backups.** In the Vercel dashboard, open Storage → your Blob store → Manage Blobs. `machinery-mall/data/content.json` holds the website content and `machinery-mall/private/enquiries-….json` holds the enquiries.
- **Changes on the live site** appear within about a minute of saving in the admin (the public pages are cached briefly to keep the site fast and within Vercel's free limits).
- **Simultaneous edits.** This setup is designed for a small team of admins. If two people save at the same moment, the later save wins.
