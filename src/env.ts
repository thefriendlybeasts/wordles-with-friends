export const env = {
  services: {
    wordnik: {
      apiKey: import.meta.env.VITE_SERVICES_WORDNIK_API_KEY as string,
      baseUrl: 'https://api.wordnik.com/v4/',
      endpoints: {
        wordLookup: 'word.json/{word}/definitions',
      },
    },
  },
};
