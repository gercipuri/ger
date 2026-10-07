# Bar website

A responsive static website with directions, telephone contact, a Booking.com link, and a table reservation request form. No build tools or dependencies are required.

## Run locally

From `/workspace/ger`:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

## Add business details

Edit `config.js` with the bar name, public telephone number, address, Google Maps URL, Booking.com URL, and optionally an existing online table booking URL. Web links must use HTTPS. Empty links are hidden. No credentials belong in this file.

The reservation form prepares a request and directs guests to telephone contact or the configured table booking service. It does not send or store reservations, check availability, or confirm bookings. A reservation backend or an existing booking service is needed for automated booking confirmation. The separate Booking.com link is not used for table reservations.

The cocktail artwork is an illustration. Replace it with supplied bar photography when available. Display fonts use Google Fonts with local serif and sans-serif fallbacks.

## Hosting

Publish the files on a static host such as GitHub Pages, Netlify, or Cloudflare Pages. No deployment has been performed.
