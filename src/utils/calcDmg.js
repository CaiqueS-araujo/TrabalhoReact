export function calcDmg(atk, def, power) {
  const roll = 0.85 + Math.random() * 0.15;
  return Math.max(1, Math.round(((power * atk) / Math.max(1, def)) * roll));
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
