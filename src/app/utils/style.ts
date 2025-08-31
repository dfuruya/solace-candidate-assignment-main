const tableRowBorderClass = (idx: number, length: number) => {
  if (idx === 0) return "rounded-l-xl";
  if (idx === length - 1) return "rounded-r-xl";
  return "";
};

export { tableRowBorderClass };
