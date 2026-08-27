# Prilla Treasures Website Owner Guide

This guide explains how to run the shop without editing page code.

## Current launch status

The website foundation is complete and builds successfully. The public shop intentionally has no buyable product yet because real prices and checkout links were not supplied. The legal pages are marked as launch drafts until the final business and provider settings are known.

Do not remove those safeguards. A product should appear only after its final files, price, preview images, checkout, delivery and refund wording have been checked.

## The services and their costs

### Website hosting

Cloudflare Pages is the deployment target. Static asset requests are free and unlimited on the current free plan. The current free plan also allows 500 builds per month. The website is static, so ordinary visitors do not run a database or a paid server.

The domain itself still has an annual registration cost. Payment fees are charged per sale. A free allowance can also change in the future, so check provider pricing before launch and once each year.

Official references:

* https://developers.cloudflare.com/pages/platform/limits/
* https://developers.cloudflare.com/pages/functions/pricing/

### Payments and delivery

Lemon Squeezy currently lists Ghana for bank payouts. It has no monthly store bill when used only for ecommerce, but transaction, currency and payout fees can apply. The current payout threshold is 50 United States dollars. Merchant approval, identity checks, tax forms and payout setup are still required.

Use Lemon Squeezy hosted checkout and store the paid files inside Lemon Squeezy. Its successful payment record should trigger the receipt and secure download. Never reveal a file because a buyer returned to a success page. A return page can say thank you, but it must not contain a raw download link.

Official references:

* https://docs.lemonsqueezy.com/help/getting-started/supported-countries
* https://docs.lemonsqueezy.com/help/getting-started/getting-paid
* https://docs.lemonsqueezy.com/help/checkout/payment-methods

### Email

Kit currently offers a free plan for up to 10,000 subscribers with forms, landing pages, broadcasts, tags and API access. Visual automations and email sequences are not included in the current free plan. Create the Kit account and a real form before adding signup code to this site.

Official reference:

* https://help.kit.com/en/articles/16627071-the-kit-free-plan

### Content editor

Sveltia CMS is an open source editor that writes articles and products into the GitHub repository. It does not add a content database or a monthly website bill.

GitHub login for a nontechnical owner needs a one time OAuth setup. The Sveltia team provides an authenticator that can run on the Cloudflare Workers free plan. A personal access token can be used for initial testing, but OAuth is the better long term owner experience.

Official references:

* https://sveltiacms.app/en/docs/backends/github
* https://github.com/sveltia/sveltia-cms-auth

## One time GitHub and Cloudflare setup

1. Create a private GitHub repository for this website.
2. Upload this full project to the repository. Keep the default branch named `main`.
3. The website editor is connected to `prissytoddlertools/prilla-treasures-site` in `public/admin/config.yml`.
4. In Cloudflare, create a Pages project from the GitHub repository.
5. Set the build command to `pnpm build`.
6. Set the output directory to `dist`.
7. Add PrillaTreasures.com as the custom domain.
8. Follow the Sveltia Authenticator instructions to create the GitHub OAuth app and Cloudflare Worker.
9. Add the authenticator address as `base_url` under `backend` in `public/admin/config.yml`.
10. Visit `https://PrillaTreasures.com/admin/` and test login, article creation and publishing.

Do not place a GitHub secret, payment key, password or OAuth secret in this repository.

## Add a parent resource

1. Sign in at `/admin/`.
2. Choose Parent Resources.
3. Choose New Parent Resource.
4. Enter a searchable title, SEO title and search description.
5. Choose one problem shelf.
6. Add tags and an image when useful.
7. Write the article and add links to a matching problem shelf, product or free tool.
8. Keep the item as a draft while reviewing it.
9. Turn off Keep as Draft and publish.

Publishing changes GitHub. Cloudflare then builds the updated static site.

## Add a product

1. Finish the product files and upload them to Lemon Squeezy.
2. Create the hosted checkout and copy its real URL.
3. Test the product in Lemon Squeezy test mode.
4. Sign in at `/admin/` and choose Products.
5. Create a product with a searchable title and one stable slug.
6. Choose one problem shelf.
7. Enter the display price exactly as customers should see it.
8. Paste the hosted checkout link.
9. Upload real product previews.
10. Complete What Is Included, How To Use It, Important Limits and Questions and Answers.
11. Explain the problem and approach in the main product body.
12. Review the page on a phone and a computer.
13. Turn off Keep as Draft only after every check passes.

Do not rename the product file after publishing. Its file name becomes the permanent product address used by Pinterest.

## Change a price or checkout link

Open the product in `/admin/`, change Display Price or Hosted Checkout Link, then publish. Update the price in Lemon Squeezy at the same time. Visit the product page and open checkout to confirm both places match.

## Replace images

Images added through the editor go into `public/uploads/`.

The main owned images are:

* `src/assets/brand/prissy-toddler-tools-logo.png`
* `src/assets/founder/founder-portrait.jpeg`
* `src/assets/products/` for product previews already used in designed pages

Keep the same file name when making a direct replacement. Use a sharp, properly licensed image. Product preview text must be readable on a phone.

## Add social profiles

Open `src/data/socials.ts`. Add only confirmed public profiles. Use this format:

```ts
{ label: 'Pinterest', url: 'https://www.pinterest.com/REAL_PROFILE/' }
```

An empty list hides social links. This prevents invented or dead profiles from appearing.

## Analytics

After the domain is live, create Cloudflare Web Analytics and copy the site token. Add it in the Cloudflare Pages environment settings as:

```text
PUBLIC_CF_WEB_ANALYTICS_TOKEN
```

Use Cloudflare to review traffic source and landing pages. Use Lemon Squeezy for completed purchase records. Checkout buttons already include product event labels for a future event tool, but no extra tracker should be added without updating the Privacy Policy.

## Required checkout tests

Run these before the first sale and again after changing checkout or delivery:

* Successful payment
* Declined payment
* Customer cancellation
* Duplicate purchase
* Refund
* Expired download access
* Invalid download access
* Receipt delivery
* Download instruction clarity
* Mobile checkout
* Provider error
* Return to the shop after checkout

Confirm that returning to the website without a verified payment never reveals a paid file.

## Required website checks

Before launch:

* Build the site successfully
* Open every navigation and footer link
* Open all six problem shelves
* Open every published product and resource
* Test each purchase link
* Test the contact email
* Test the editor login and publishing flow
* Check phone, tablet and desktop layouts
* Check image size and clarity
* Confirm titles, descriptions, headings and image descriptions
* Check the sitemap and not found page
* Review the three legal pages with the final provider settings
* Add only real social profiles
* Keep testimonials hidden until genuine permission and wording exist

The static design is suitable for traffic spikes because visitors receive generated files from a content delivery network. A local request test cannot guarantee Cloudflare performance. Test the deployed site through Cloudflare before making a specific traffic promise.

## If ChatGPT or Codex is no longer available

The site remains in GitHub, the generated site remains in Cloudflare, customer orders remain in Lemon Squeezy and subscribers remain in Kit. Any developer familiar with Astro can maintain the files. The website does not depend on an active ChatGPT subscription.
