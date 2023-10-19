export const formatDate = (timestamp) => {
  //turn the string around
  const turnAround = timestamp.split("-").reverse().join("-");

  const dateArray = turnAround.split("-");
  const year = dateArray[2];
  const month = dateArray[1];
  const day = dateArray[0];
  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
};
