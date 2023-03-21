/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
async function parseJSON<T>(response: Response): Promise<T> {
  try {
    const result = await response.json();
    return result as T;
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request<T>(
  url: RequestInfo,
  options?: RequestInit | undefined
): Promise<T> {
  try {
    const resp = await fetch(url, options);
    const json = await parseJSON<T>(resp);
    if (resp.status >= 200 && resp.status < 300 && resp.ok) {
      return json;
    }
    return Promise.reject(json);
  } catch (error) {
    return Promise.reject(error);
  }
}
