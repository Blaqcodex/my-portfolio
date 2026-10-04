export const SPRING = Object.freeze({
  // Stiffness controls pull strength; damping limits oscillation without a heavy settle.
  stiffness: 190,
  damping: 25,
  // Capping elapsed time prevents a tab-resume frame from launching an object.
  maxDelta: 1 / 30
});

export function stepSpring(state, target, deltaSeconds, stiffness = SPRING.stiffness, damping = SPRING.damping) {
  const delta = Math.min(Math.max(deltaSeconds, 0), SPRING.maxDelta);
  const acceleration = (target - state.position) * stiffness - state.velocity * damping;

  state.velocity += acceleration * delta;
  state.position += state.velocity * delta;

  if (Math.abs(target - state.position) < 0.01 && Math.abs(state.velocity) < 0.01) {
    state.position = target;
    state.velocity = 0;
  }

  return state.position;
}
