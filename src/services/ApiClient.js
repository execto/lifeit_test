export class ApiClient {
  apiUrl = "https://reqres.in/api";

  async handleApiError(res) {
    if (res.status >= 400) {
      const r = await res.json();
      throw new Error(r.error || r.toString());
    }
    return res;
  }

  post(url, data = {}) {
    const requestUrl = `${this.apiUrl}${url}?delay=1`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    return fetch(requestUrl, options)
      .then(this.handleApiError)
      .then((res) => res.json());
  }
}
