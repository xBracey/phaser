const generateNumber = () => {
  let letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];

  let randomNumber = Math.floor(Math.random() * 16);
  return letters[randomNumber];
};

export const generateColour = () => {
  let hex = "";
  for (let index = 0; index < 6; index++) {
    hex = hex + generateNumber();
  }
  return parseInt(hex, 16);
};
