import queryStringify from "../utils/queryStringify";

enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

type FetchOptions = {
  data?: { [key: string]: string };
  timeout?: number;
};

export interface RequestOptions {
  method: METHODS;
  data?: { [key: string]: string };
}

class HTTPTransport {
  get = (url: string, options: FetchOptions = {}) => {
    const { data } = options;
    const query = data ? queryStringify(data) : ``;
    console.log(`get`, `${url}${query}`);
    return this.request(
      `${url}${query}`,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  put = (url: string, options: FetchOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  post = (url: string, options: FetchOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  delete = (url: string, options: FetchOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (url: string, options: RequestOptions, timeout = 5000) => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.setRequestHeader(`content-type`, `application/json`);

      xhr.onload = function (e) {
        const statusCode = Number(xhr.status.toString().charAt(0));

        if (statusCode === 2) {
          resolve(xhr);
        }

        if (statusCode === 4 || statusCode === 5) {
          reject(xhr);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
