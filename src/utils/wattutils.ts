const formatWatts = (watts: number) => {
  let unit = 'W';
  let divide = 1;

  if (watts > 1e18) {
    unit = 'EW';
    divide = 1e18;
  } else if (watts >= 1e15) {
    unit = 'PW';
    divide = 1e15;
  } else if (watts >= 1e12) {
    unit = 'TW';
    divide = 1e12;
  } else if (watts >= 1e9) {
    unit = 'GW';
    divide = 1e9;
  } else if (watts >= 1e6) {
    unit = 'MW';
    divide = 1e6;
  } else if (watts >= 1e3) {
    unit = 'kW';
    divide = 1e3;
  }

  const numberFormat = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });
  return `${numberFormat.format(watts / divide)} ${unit}`;
};

export { formatWatts };
