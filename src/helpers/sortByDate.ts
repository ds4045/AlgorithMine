export const sortByDate = (a: any, b: any) => {
  if (!a.date && !b.date) alert('Wrong type');
  const dateA = a.date.split('.').reverse().join('-');
  const dateB = b.date.split('.').reverse().join('-');
  return new Date(dateA).getTime() - new Date(dateB).getTime();
};
