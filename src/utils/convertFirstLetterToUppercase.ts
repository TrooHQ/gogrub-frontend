export function convertFirstLetterToUppercase(sentence: string): string {
  return sentence
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
