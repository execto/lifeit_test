export class AuthService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  login(email, password) {
    return this.apiClient.post("/login", { email, password });
  }
}
