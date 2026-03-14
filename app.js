
const filterButtons = document.querySelectorAll('[data-filter]');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxMeta = document.getElementById('lightbox-meta');
const closeBtn = document.getElementById('lightbox-close');
let currentIndex = 0;
const visibleItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  galleryItems.forEach(item => { item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none'; });
  if(location.hash && filter !== 'all') location.hash = filter;
}));
function openLightboxByElement(item){
  if(!lightbox) return;
  const list = visibleItems();
  currentIndex = list.indexOf(item);
  const img = item.querySelector('img');
  lightboxImage.src = item.dataset.full || img.src;
  lightboxImage.alt = img.alt;
  lightboxTitle.textContent = item.dataset.title || img.alt;
  lightboxMeta.textContent = item.dataset.meta || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){ if(!lightbox) return; lightbox.classList.remove('open'); document.body.style.overflow = ''; }
function move(step){ const list = visibleItems(); if(!list.length) return; currentIndex = (currentIndex + step + list.length) % list.length; openLightboxByElement(list[currentIndex]); }
galleryItems.forEach(item => item.addEventListener('click', () => openLightboxByElement(item)));
if(closeBtn){ closeBtn.addEventListener('click', closeLightbox); }
if(lightbox){
  lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
  document.getElementById('lightbox-prev').addEventListener('click', e => { e.stopPropagation(); move(-1); });
  document.getElementById('lightbox-next').addEventListener('click', e => { e.stopPropagation(); move(1); });
}
document.addEventListener('keydown', e => { if(!lightbox || !lightbox.classList.contains('open')) return; if(e.key === 'Escape') closeLightbox(); if(e.key === 'ArrowRight') move(-1); if(e.key === 'ArrowLeft') move(1); });
