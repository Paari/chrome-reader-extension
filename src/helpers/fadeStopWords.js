import { stopWords } from "../libs/stopWords";

/**
 * Takes in the unparsed html as string
 * find the stop words in that string
 * wrap a span around it with 'fade' class
 * @param {string} content - content for finding and fading stop words
 * @return {string}
 */
export const fadeStopWords = content => {
  let fadedContent = content.split(" ");
  fadedContent.forEach((word, index) => {
    if (stopWords.includes(word.toLowerCase())) {
      fadedContent[index] = `<span class="rr-fade">${word}</span>`;
    }
  });

  return fadedContent.join(" ");
};
