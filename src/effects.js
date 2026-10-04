import { stepSpring } from './lib/physics/spring.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!reducedMotion && finePointer) {
  const cursor = document.getElementById('cursor');
  const cursorX = { position: -100, velocity: 0 };
  const cursorY = { position: -100, velocity: 0 };
  const cursorScale = { position: 1, velocity: 0 };
  const magnets = [...document.querySelectorAll('[data-magnetic]')].map(element => ({
    element,
    x: { position: 0, velocity: 0 },
    y: { position: 0, velocity: 0 },
    targetX: 0,
    targetY: 0
  }));
  const cards = [...document.querySelectorAll('[data-tilt]')].map(element => ({
    element,
    x: { position: 0, velocity: 0 },
    y: { position: 0, velocity: 0 },
    targetX: 0,
    targetY: 0,
    active: false
  }));

  let pointerX = -100;
  let pointerY = -100;
  let targetScale = 1;
  let frame = 0;
  let previousTime = 0;

  document.body.classList.add('custom-cursor');

  function requestFrame() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  function render(time) {
    frame = 0;
    const delta = previousTime ? (time - previousTime) / 1000 : 1 / 60;
    previousTime = time;
    let unsettled = false;

    const x = stepSpring(cursorX, pointerX, delta);
    const y = stepSpring(cursorY, pointerY, delta);
    const scale = stepSpring(cursorScale, targetScale, delta);
    cursor.style.setProperty('--cursor-x', `${x}px`);
    cursor.style.setProperty('--cursor-y', `${y}px`);
    cursor.style.setProperty('--cursor-scale', scale.toFixed(3));
    unsettled ||= cursorX.velocity !== 0 || cursorY.velocity !== 0 || cursorScale.velocity !== 0;

    magnets.forEach(magnet => {
      const xOffset = stepSpring(magnet.x, magnet.targetX, delta, 150, 22);
      const yOffset = stepSpring(magnet.y, magnet.targetY, delta, 150, 22);
      magnet.element.style.setProperty('--magnetic-x', `${xOffset.toFixed(2)}px`);
      magnet.element.style.setProperty('--magnetic-y', `${yOffset.toFixed(2)}px`);
      unsettled ||= magnet.x.velocity !== 0 || magnet.y.velocity !== 0;
    });

    cards.forEach(card => {
      const rotateX = stepSpring(card.x, card.targetX, delta, 120, 20);
      const rotateY = stepSpring(card.y, card.targetY, delta, 120, 20);
      card.element.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
      card.element.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
      if (!card.active && rotateX === 0 && rotateY === 0) card.element.classList.remove('is-tilting');
      unsettled ||= card.x.velocity !== 0 || card.y.velocity !== 0;
    });

    if (unsettled) requestFrame();
    else previousTime = 0;
  }

  document.addEventListener('pointermove', event => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    targetScale = event.target.closest('a, button, [data-tilt]') ? 2.4 : 1;

    magnets.forEach(magnet => {
      const bounds = magnet.element.getBoundingClientRect();
      const inside = pointerX >= bounds.left - 24 && pointerX <= bounds.right + 24
        && pointerY >= bounds.top - 24 && pointerY <= bounds.bottom + 24;
      magnet.targetX = inside ? (pointerX - (bounds.left + bounds.width / 2)) * 0.14 : 0;
      magnet.targetY = inside ? (pointerY - (bounds.top + bounds.height / 2)) * 0.14 : 0;
    });

    cards.forEach(card => {
      const bounds = card.element.getBoundingClientRect();
      card.active = pointerX >= bounds.left && pointerX <= bounds.right
        && pointerY >= bounds.top && pointerY <= bounds.bottom;
      card.targetX = card.active ? ((bounds.top + bounds.height / 2 - pointerY) / bounds.height) * 4 : 0;
      card.targetY = card.active ? ((pointerX - bounds.left - bounds.width / 2) / bounds.width) * 4 : 0;
      if (card.active) card.element.classList.add('is-tilting');
    });

    requestFrame();
  }, { passive: true });

  document.addEventListener('pointerleave', () => {
    pointerX = -100;
    pointerY = -100;
    targetScale = 1;
    magnets.forEach(magnet => {
      magnet.targetX = 0;
      magnet.targetY = 0;
    });
    cards.forEach(card => {
      card.targetX = 0;
      card.targetY = 0;
      card.active = false;
    });
    requestFrame();
  });
}
