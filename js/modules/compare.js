/*
 * Modul perbandingan before/after: pembatas geser dengan dukungan pointer,
 * sentuhan, dan papan ketik.
 */

const MIN_POSITION = 0;
const MAX_POSITION = 100;
const KEY_STEP_SMALL = 2;
const KEY_STEP_LARGE = 10;

export function initCompare(root) {
  if (!root) return null;

  const frame = root.querySelector('[data-compare-frame]');
  const divider = root.querySelector('[data-compare-divider]');

  if (!frame || !divider) return null;

  let position = 50;

  const setPosition = (value) => {
    const clamped = Math.min(MAX_POSITION, Math.max(MIN_POSITION, value));
    position = clamped;
    frame.style.setProperty('--compare-pos', `${clamped}%`);
    divider.setAttribute('aria-valuenow', String(Math.round(clamped)));
  };

  const pointerPosition = (event) => {
    const rect = frame.getBoundingClientRect();
    if (rect.width === 0) return position;
    return ((event.clientX - rect.left) / rect.width) * MAX_POSITION;
  };

  let isDragging = false;

  frame.addEventListener('pointerdown', (event) => {
    isDragging = true;
    frame.setPointerCapture(event.pointerId);
    setPosition(pointerPosition(event));
  });

  frame.addEventListener('pointermove', (event) => {
    if (isDragging) setPosition(pointerPosition(event));
  });

  const stopDragging = () => {
    isDragging = false;
  };

  frame.addEventListener('pointerup', stopDragging);
  frame.addEventListener('pointercancel', stopDragging);

  divider.addEventListener('keydown', (event) => {
    const step = event.shiftKey ? KEY_STEP_LARGE : KEY_STEP_SMALL;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        setPosition(position - step);
        event.preventDefault();
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        setPosition(position + step);
        event.preventDefault();
        break;
      case 'Home':
        setPosition(MIN_POSITION);
        event.preventDefault();
        break;
      case 'End':
        setPosition(MAX_POSITION);
        event.preventDefault();
        break;
    }
  });

  setPosition(50);

  return { setPosition };
}
