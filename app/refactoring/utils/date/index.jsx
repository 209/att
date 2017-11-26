export const dateToStrong = date => {
  const utcMonth = date.getUTCMonth() + 1;
  const utcDate = date.getUTCDate();
  const year = date.getUTCFullYear();
  const month = `${(utcMonth < 10) ? '0' : ''}${utcMonth}`;
  const date = `${(utcDate < 10) ? '0' : ''}${utcDate}`;

  return `${year}-${month}-${date}`;
};
