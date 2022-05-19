const calcAverage = (array: number[]) => {
  const sum = array.reduce((prev, next) => prev + next, 0);
  return Math.round(sum / array.length);
};

export { calcAverage };
