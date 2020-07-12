export class UsersService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  loadUsers(url) {
    return this.apiClient.get(url);
  }
}
