export const lerp = (start, end, amount) => {
  return (1 - amount) * start + amount * end
}


export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}
