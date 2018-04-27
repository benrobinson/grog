export function fromRadians(radians) {
  return radians * (180 / Math.PI)
}

export function fromVelocity(vx, vy) {
  if (vx === 0 && vy > 0) return 0;
  if (vx === 0 && vy < 0) return 180;
  if (vx > 0 && vy === 0) return 90;
  if (vx < 0 && vy === 0) return 270;
  const degs = Math.atan(vx / vy) * (180 / Math.PI);
  if (vx > 0 && vy > 0) return deg;
  if (vx > 0 && vy < 0) return deg + 90;
  if (vx < 0 && vy < 0) return deg + 180;
  if (vx < 0 && vy > 0) return deg + 270;
}

export function toRadians(degrees) {
  return degrees * (Math.PI / 180)
}

export function toVelocity(degrees, speed) {
  const sin = Math.sin(Degrees.toRadians(degrees));
  const opp = speed * sin;
  const cos = Math.cos(Degrees.toRadians(degrees));
  const adj = speed * cos;
  return {
    x: adj,
    y: opp
  }
}