import HTTPTransport, { RequestOptions } from "../core/HTTPTransport";

interface FetchOptions extends RequestOptions {
  [key: string]: unknown;
  tries?: number;
}

const api = new HTTPTransport();

function fetchWithRetry(url: string, options: FetchOptions): never {
  const { tries = 1 } = options;

  function onError(err) {
    const triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }

    return fetchWithRetry(url, { ...options, tries: triesLeft });
  }

  return api.request(url, options).catch(onError);
}

export default fetchWithRetry;
