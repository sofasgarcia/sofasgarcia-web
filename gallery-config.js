// =============================================================
// SOFÁS GARCÍA — Configuración Central de Cloudinary
// =============================================================

const CLOUD_NAME = 'dhdphvgqe';
const CDN = 'https://res.cloudinary.com/' + CLOUD_NAME + '/image/upload';

// ── TARJETAS DE INICIO (portadas manuales estables) ──────────
var HOME_CATEGORIES = [
  {
    id: 'sofas',
    title: 'Sofás a medida',
    cover: CDN + '/f_auto,q_auto,w_900/web-home-trabajos-chaise-longue',
    href: 'gallery.html?cat=sofas'
  },
  {
    id: 'sillones',
    title: 'Sillones',
    cover: CDN + '/f_auto,q_auto,w_900/web-home-trabajos-sillon-relax',
    href: 'gallery.html?cat=sillones'
  },
  {
    id: 'cabeceros',
    title: 'Cabeceros tapizados',
    cover: CDN + '/f_auto,q_auto,w_900/web-home-trabajos-cabecero-tapizado',
    href: 'gallery.html?cat=cabeceros'
  },
  {
    id: 'retapizado',
    title: 'Retapizado sillas/sofás',
    cover: CDN + '/f_auto,q_auto,w_900/web-home-trabajos-silla-tapizada',
    href: 'gallery.html?cat=retapizado'
  },
  {
    id: 'automocion',
    title: 'Tapicería de automoción',
    cover: CDN + '/f_auto,q_auto,w_900/web-home-trabajos-sillon-moto',
    href: 'gallery.html?cat=automocion'
  }
];

// ── CATEGORÍAS DE GALERÍA ─────────────────────────────────────
var GALLERY_CATEGORIES = [
  {
    id: 'sofas',
    label: 'Sofás',
    tags: ['sofa-2-plazas', 'sofa-3-plazas', 'sofa-chaise-longue', 'sofa-rinconera'],
    subcategories: [
      { id: 'sofa-2-plazas',       label: '2 plazas' },
      { id: 'sofa-3-plazas',       label: '3 plazas' },
      { id: 'sofa-chaise-longue',  label: 'Chaise longue' },
      { id: 'sofa-rinconera',      label: 'Rinconeras' }
    ]
  },
  { id: 'sillones',   label: 'Sillones',   tags: ['sillon'],    subcategories: [] },
  { id: 'sillas',     label: 'Sillas',     tags: ['silla'],     subcategories: [] },
  { id: 'cabeceros',  label: 'Cabeceros',  tags: ['cabecero'],  subcategories: [] },
  { id: 'automocion', label: 'Automoción', tags: ['automocion'], subcategories: [] },
  // Hidden from nav bar, accessible via ?cat=retapizado (desde inicio)
  {
    id: 'retapizado',
    label: 'Retapizado',
    tags: ['silla', 'sofa-2-plazas', 'sofa-3-plazas', 'sofa-chaise-longue', 'sofa-rinconera'],
    subcategories: [],
    hidden: true
  }
];

// ── FETCH FUNCTIONS ───────────────────────────────────────────

async function fetchImagesByTag(tag) {
  try {
    var res = await fetch('https://res.cloudinary.com/' + CLOUD_NAME + '/image/list/' + tag + '.json');
    if (!res.ok) return [];
    var data = await res.json();
    return (data.resources || []).map(function(r) {
      return {
        publicId: r.public_id,
        url: CDN + '/f_auto,q_auto,w_800/' + r.public_id,
        alt: r.public_id.split('/').pop().replace(/[-_]/g, ' ')
      };
    });
  } catch (e) {
    console.warn('[Cloudinary] Tag "' + tag + '" error:', e.message);
    return [];
  }
}

async function fetchImagesByTags(tags) {
  var results = await Promise.all(tags.map(function(t) { return fetchImagesByTag(t); }));
  var seen = new Set();
  return results.flat().filter(function(img) {
    if (seen.has(img.publicId)) return false;
    seen.add(img.publicId);
    return true;
  });
}

// Expose globally
window.SofasGarcia = {
  HOME_CATEGORIES: HOME_CATEGORIES,
  GALLERY_CATEGORIES: GALLERY_CATEGORIES,
  CDN: CDN,
  fetchImagesByTag: fetchImagesByTag,
  fetchImagesByTags: fetchImagesByTags
};
