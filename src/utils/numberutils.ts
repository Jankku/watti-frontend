const calcMin = (array: number[]) => Math.min(...array);

const calcMax = (array: number[]) => Math.max(...array);

const calcSum = (array: number[]) => array.reduce((prev, next) => prev + next, 0);

const calcAverage = (array: number[]) => {
  const sum = calcSum(array);
  return Math.round(sum / array.length);
};

const formatNumber = (num: number, maxDecimals?: number) =>
  Intl.NumberFormat('en-US', { maximumFractionDigits: maxDecimals ?? 0 }).format(num);

export { calcMin, calcMax, calcSum, calcAverage, formatNumber };
