export const options = {
  month: "2-digit",
  day: "2-digit",
  year: "2-digit",
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const dateString = date.toLocaleDateString("en-US", options);

  return dateString;
};
