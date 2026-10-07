(() => {
  const config = window.BAR_CONFIG || {};
  const name = config.name || 'Your Bar';
  document.querySelectorAll('[data-bar-name]').forEach(el => { el.textContent = name; });
  document.title = `${name} · Stay a little longer`;
  document.querySelector('#year').textContent = new Date().getFullYear();
  const safeUrl = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; } };
  function activateLink(id, url, placeholder) {
    const el = document.querySelector(id);
    if (!url) return;
    el.href = url; el.hidden = false;
    if (placeholder) document.querySelector(placeholder).hidden = true;
  }
  activateLink('#maps-link', safeUrl(config.googleMapsUrl));
  activateLink('#stay-link', safeUrl(config.bookingComUrl), '#stay-placeholder');
  if (config.address) document.querySelector('#address').textContent = config.address;
  const phone = typeof config.phone === 'string' ? config.phone.replace(/[^+\d]/g, '') : '';
  const phoneUrl = /\d{5,}/.test(phone) ? `tel:${phone}` : null;
  activateLink('#phone-link', phoneUrl, '#contact-placeholder');
  if (phoneUrl) document.querySelector('#phone-link').textContent = config.phone;
  const tableUrl = safeUrl(config.tableBookingUrl);
  if (tableUrl || phoneUrl) document.querySelector('#booking-note').textContent = tableUrl ? 'Continue to our booking service to check availability and confirm your table.' : 'Call us with your preferred date and time to check availability.';
  const form = document.querySelector('#booking-form');
  const dateInput = form.elements.date;
  const today = new Date();
  dateInput.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const dialog = document.querySelector('#reservation-dialog');
  let summary = '';
  form.addEventListener('submit', event => {
    event.preventDefault();
    const status = document.querySelector('#form-status');
    if (!tableUrl && !phoneUrl) { status.textContent = 'Reservations are not connected yet. Please check back when the bar’s contact details are available.'; return; }
    if (dateInput.value < dateInput.min) { status.textContent = 'Please choose today or a future date.'; return; }
    status.textContent = '';
    const data = new FormData(form);
    summary = `Table request for ${name}\nName: ${data.get('name')}\nGuests: ${data.get('guests')}\nDate: ${data.get('date')}\nTime: ${data.get('time')}${data.get('notes') ? `\nNotes: ${data.get('notes')}` : ''}`;
    document.querySelector('#reservation-summary').textContent = summary;
    const contact = document.querySelector('#reservation-contact');
    contact.href = tableUrl || phoneUrl;
    contact.textContent = tableUrl ? 'Open table booking service ↗' : `Call ${config.phone}`;
    if (tableUrl) { contact.target = '_blank'; contact.rel = 'noopener noreferrer'; }
    document.querySelector('#copy-status').textContent = '';
    dialog.showModal();
  });
  document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
  document.querySelector('#copy-request').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(summary); document.querySelector('#copy-status').textContent = 'Request copied.'; }
    catch { document.querySelector('#copy-status').textContent = 'Please select and copy the request above.'; }
  });
})();
