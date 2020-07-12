export class ApiClient {
  apiUrl = "https://reqres.in/api";

  async handleApiError(res) {
    if (res.status >= 400) {
      const r = await res.json();
      throw new Error(r.error || r.toString());
    }
    return res;
  }

  request(url, options) {
    const requestUrl = `${this.apiUrl}${url}?delay=1`;

    return fetch(requestUrl, options)
      .then(this.handleApiError)
      .then((res) => res.json());
  }

  post(url, data = {}, requestOptions = {}) {
    const options = {
      ...requestOptions,
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    return this.request(url, options);
  }

  get(url, requestOptions = {}) {
    const options = {
      ...requestOptions,
      method: "GET",
    };

    return this.request(url, options);
  }
}
