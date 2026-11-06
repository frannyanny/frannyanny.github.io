// Lightbox for gallery images. Links still open the full image if JS is off.
document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.querySelector('.lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const img = dialog.querySelector('.lightbox-figure img');
  const caption = dialog.querySelector('.lightbox-caption');
  const count = dialog.querySelector('.lightbox-count');
  let items = [];
  let index = 0;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const item = items[index];
    img.src = item.href;
    // Items past the preview limit are hidden links with no thumbnail.
    img.alt = item.querySelector('img')?.alt || item.dataset.alt || '';
    caption.textContent = item.dataset.caption || '';
    count.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
    // Warm the cache for the neighbours.
    [index - 1, index + 1].forEach((n) => {
      const next = items[(n + items.length) % items.length];
      if (next) new Image().src = next.href;
    });
  };

  document.addEventListener('click', (event) => {
    const item = event.target.closest('.gallery-item');
    if (!item || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    items = [...item.closest('[data-gallery]').querySelectorAll('.gallery-item')];
    show(items.indexOf(item));
    dialog.showModal();
  });

  dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
  dialog.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());

  // Click on the dark area (not the image or buttons) closes.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.classList.contains('lightbox-figure')) dialog.close();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
  });

  // Basic swipe on touch screens.
  let startX = null;
  dialog.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  dialog.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });

  dialog.addEventListener('close', () => { img.removeAttribute('src'); });
});
