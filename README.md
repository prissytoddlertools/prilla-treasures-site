# Prissy Toddler Tools by Prilla Treasures

This is the owned Astro codebase for PrillaTreasures.com. It produces a static shop that can be deployed to Cloudflare Pages and moved to another static host later without rebuilding the website.

The customer facing store is Prissy Toddler Tools. Prilla Treasures is the parent brand and domain owner.

## What is already built

* Premium responsive home page using the approved logo, real product previews and founder portrait
* Permanent problem shelves for all six agreed categories
* Data driven product catalogue with one permanent route per published product
* Full product sales page template with previews, contents, use steps, limits, questions and hosted checkout
* Parent resource collection with permanent article routes
* Browser based Sveltia content editor at `/admin/`
* About, FAQ, contact, privacy, terms, digital delivery and refund pages
* Sitemap, robots file, social metadata and optional Cloudflare Web Analytics
* Cloudflare security and long term asset cache headers
* No database, user account system or custom card processing

Incomplete products never appear in the public shop. A product must have `draft: false`, a display price and a hosted checkout link before the site generates its public page.

## Local development

Use Node 22.12 or later and pnpm.

```text
pnpm install
pnpm dev
pnpm build
pnpm preview
```

The production files are created in `dist/`.

## Main folders

```text
src/content/products      Product records and sales copy
src/content/resources     Parent resource articles
src/pages                 Permanent website routes
src/assets                Owned logo, founder photo and product previews
src/data                  Problem shelves and confirmed social links
public/admin              Browser content editor
public/uploads            Images uploaded through the editor
```

## Ownership

All shop copy, routes and content live in ordinary files in this repository. GitHub stores the history. Cloudflare only hosts a generated copy. The payment provider stores paid files and verifies payment. The email provider stores subscribers.

Read [OWNER GUIDE.md](./OWNER%20GUIDE.md) for the nontechnical publishing, payment, email, image and deployment instructions.
