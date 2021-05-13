export const createID = () => {
  return Math.floor(Math.random() * 10000 * new Date().getTime());
};

export const formatDate = (date: string) => {
  const today = new Date(date);
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return yyyy + "/" + mm + "/" + dd;
};
