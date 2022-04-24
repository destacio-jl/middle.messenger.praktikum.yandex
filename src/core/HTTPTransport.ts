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
  formData?: boolean;
  data?: { [key: string]: string };
}

class HTTPTransport {
  _host = "/";

  constructor(host = "/") {
    this._host = host;
  }

  get = (url: string, options: FetchOptions = {}) => {
    const { data } = options;
    const query = data ? queryStringify(data) : ``;
    return this.request(
      `${url}${query}`,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  put = (url: string, options: FetchOptions = {}) => {
    console.log({ options });
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
    const { method, formData, data } = options;

    console.log(options);

    const fullUrl = `${this._host}${url}`;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, fullUrl);

      if (!formData) {
        xhr.setRequestHeader(`content-type`, `application/json`);
      }

      xhr.withCredentials = true;

      xhr.onload = () => {
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
        xhr.send(formData ? data : JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
