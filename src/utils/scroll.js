/**
 * Smooth scrolling utility that calculates accurate offset
 * accounting for the dynamic sticky newspaper masthead height.
 */
export function smoothScrollTo(id, extraPadding = 24) {
  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 120;
  const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
  const targetY = Math.max(0, elementPosition - headerHeight - extraPadding);

  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  });
}
