import moment from "moment-timezone";
// function to capitalize first letter of a string
export const capitalizeFirstLetter = (string: string) => {
  // check if string is empty
  if (string.length === 0) {
    return string;
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeFirstLetterOfEachWord = (string: string) => {
  // check if string is empty
  if (string.length === 0) {
    return string;
  }

  const words = string.split(" ");
  const capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
  return capitalizedWords.join(" ");
};

// Get first letters of each word in a string
export const getFirstLetters = (string: string) => {
  // check if string is empty
  if (string === null || string === undefined) return;
  if (string.length === 0) {
    return string;
  }

  const words = string.split(" ");
  const firstLetters = words.map((word) => word.charAt(0));
  return firstLetters.join("");
};

export const formatTime = (text: string) => {
  // check if string is empty
  if (text === null || text === undefined) return;
  if (text.length === 0) {
    return text;
  }

  return moment
    .utc(text)
    .add(8, "hours")
    .tz("Asia/Manila")
    .format("MMMM DD, YYYY hh:mm A");
};
