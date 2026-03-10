/* ============================================================
   Before & After Image Comparison Slider
   inLine Orthodontics — MBR Project Solutions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const handle = slider.querySelector('.ba-slider__handle');
    const beforeImg = slider.querySelector('.ba-slider__before');
    let isDragging = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      let percent = ((x - rect.left) / rect.width) * 100;
      percent = Math.max(2, Math.min(98, percent));
      beforeImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      handle.style.left = percent + '%';
    }

    // Initialize at 50%
    setPosition(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width / 2);

    // Mouse events
    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) setPosition(e.clientX);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events
    handle.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
      if (isDragging) setPosition(e.touches[0].clientX);
    });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Click to jump
    slider.addEventListener('click', (e) => {
      if (e.target !== handle && !handle.contains(e.target)) {
        setPosition(e.clientX);
      }
    });
  });
});
