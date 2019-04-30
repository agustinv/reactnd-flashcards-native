export function timeToString (time = Date.now()) {
  return time.toString()
}

export function shuffleArray (array) {
  return array.reduce((acc, el) => {
    Math.random() > 0.5 ? acc.push(el) : acc.unshift(el);
    return acc;
  }, []);
}
