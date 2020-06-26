export class ApiClient {
  apiUrl = "https://reqres.in/api";

  post(url, data = {}) {
    const requestUrl = `${this.apiUrl}${url}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    return fetch(requestUrl, options).then((res) => res.json());
  }
}
