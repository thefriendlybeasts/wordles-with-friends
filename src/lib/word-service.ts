import { env } from '../env.js';

export default class WordService {
  apiKey;
  verifyEndpoint;

  constructor() {
    this.apiKey = env.services.wordnik.apiKey;
    this.verifyEndpoint = env.services.wordnik.endpoints.wordLookup;
  }

  async lookUpWord(word) {
    const endpoint = this.compileEndpoint('wordLookup', { word });
    const searchParams = new URLSearchParams({
      api_key: this.apiKey,
      limit: '1',
      includeRelated: 'false',
      useCanonical: 'false',
      includeTags: 'false',
    });

    return fetch(`${endpoint}?${searchParams.toString()}`);
  }

  compileEndpoint(endpointName, routeParameters) {
    const endpoint = env.services.wordnik.endpoints[endpointName];
    const compiledEndpoint = endpoint.replace('{word}', routeParameters.word);

    return `${env.services.wordnik.baseUrl}${compiledEndpoint}`;
  }

  async validateWord(word) {
		if (word.length !== 5) {
			return false;
		}

		const response = await this.lookUpWord(word);

    if (![200, 404].includes(response.status)) {
      throw new Error(`HTTP Status: ${response.status}`);
    }

    return response.status === 200;
	}
}
