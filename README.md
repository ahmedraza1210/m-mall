# Machinery Mall

The Machinery Mall website (React) with a built-in admin panel for products, product images, case studies, categories, enquiries and site settings.

There is **no separate database**. All content is stored on Vercel itself:

- **On Vercel:** content is one JSON file in **Vercel Blob** (Vercel's built-in file storage), and uploaded images are stored there too.
- **On your computer:** content is saved to `data/db.json` and images to `public/uploads/`.

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
4. Open the project's **Storage** tab, choose **Create → Blob**, and select **Public** access. Connect it to the project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
5. **Redeploy** so the new settings take effect (Deployments → ⋯ → Redeploy).

Then open `https://your-site.vercel.app/admin` and log in.

Until Blob storage is connected, the site shows the starter content, and saving in the admin shows a message explaining what to connect.

## What the admin panel can do

| Section | What you can do |
| --- | --- |
| Dashboard | See counts, the latest enquiries and products that still need photos |
| Products | Add, edit and delete products. Upload several photos per product (drag and drop, reorder, choose the cover). Edit the name, brand, model, category, condition, availability, price, short and full description, specifications table, key features, video link (YouTube or Vimeo), brochure link, and whether the product is featured on the home page |
| Case studies | Add, edit and delete case studies with a client, industry, location, summary, challenge, solution, results, metrics, photos and testimonial. Link the machines used, so the case study also appears on those product pages |
| Categories | Add, edit and delete categories, with an image for the home page tiles |
| Enquiries | Read quote requests from product pages and the contact form, set a status (new, contacted or closed), add private notes, and export to CSV |
| Site settings | Edit the site name, logo, hero text and image, key numbers, about text, phone, WhatsApp, email, address, hours, Google Map and social links |

Large photos are resized in the browser before upload (longest side 1800 px), which keeps them fast to load and under Vercel's upload limit.

## Project structure

```
api/            Vercel serverless functions
  content.js    GET  public content
  login.js      POST admin login
  admin.js      admin read, save and delete (requires login)
  upload.js     image upload (requires login)
  enquiry.js    POST quote and contact form
lib/            server code: storage (Blob or local files), auth, validation, starter content
server/         local development server (npm run dev)
src/            React app
  pages/        public pages
  pages/admin/  admin panel (loaded only when /admin is visited)
```

## Notes

- **Changing the starter content.** Edit `lib/seed.js`. The starter content is only used until the first save; after that the saved content is used.
- **Backups.** In the Vercel dashboard, open Storage → your Blob store and download the file under `machinery-mall/data/`. It contains all your content.
- **Simultaneous edits.** This setup is designed for a small team of admins. If two people save at the same moment, the later save wins.
