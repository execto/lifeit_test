const userTokenKeyName = "userToken";

export class AuthService {
  isAuthenticated = false;

  constructor(apiClient) {
    this.apiClient = apiClient;
    this.init();
  }

  init() {
    if (
      localStorage.getItem(userTokenKeyName) ||
      sessionStorage.getItem(userTokenKeyName)
    ) {
      this.isAuthenticated = true;
    }
  }

  login(logionData) {
    const { email, password, rememberMe } = logionData;

    return this.apiClient.post("/login", { email, password }).then((res) => {
      const token = res.token;
      if (rememberMe) {
        localStorage.setItem(userTokenKeyName, String(token));
      } else {
        sessionStorage.setItem(userTokenKeyName, String(token));
      }
      this.isAuthenticated = true;
    });
  }

  logout() {
    localStorage.removeItem(userTokenKeyName);
    sessionStorage.removeItem(userTokenKeyName);
    this.isAuthenticated = false;
  }
}
