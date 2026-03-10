/* ============================================================
   FAQ Accordion
   inLine Orthodontics — MBR Project Solutions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('faq-item--open');

      // Close all others
      document.querySelectorAll('.faq-item--open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('faq-item--open');
          openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
          openItem.querySelector('.faq-item__answer').style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('faq-item--open');
        btn.setAttribute('aria-expanded', 'false');
        item.querySelector('.faq-item__answer').style.maxHeight = null;
      } else {
        item.classList.add('faq-item--open');
        btn.setAttribute('aria-expanded', 'true');
        const answer = item.querySelector('.faq-item__answer');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});
