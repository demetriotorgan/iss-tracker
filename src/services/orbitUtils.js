// services/orbitUtils.js
export const checkVisibility = (distance, visibilityStatus) => {
  if (distance === null) return false;
  const isWithinRadius = distance < 2000;
  const isSunlit = visibilityStatus === 'daylight';
  return isWithinRadius && isSunlit;
};