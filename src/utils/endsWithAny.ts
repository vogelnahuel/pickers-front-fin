export const endsWithAny = (phrase: string, words: string[]) => {
  return words.some((word: string) => {
    return phrase.endsWith(word);
  });
};
