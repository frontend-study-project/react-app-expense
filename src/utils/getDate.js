export const getDate = (date) => {
  const year = date.getFullYear();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  return year + "-" + month + "-" + day;
};
