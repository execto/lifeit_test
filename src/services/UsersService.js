export class UsersService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  loadUsers() {
    return this.apiClient.get("/users");
  }

  deleteUser(userId) {
    return this.apiClient
      .delete(`/users/${userId}`)
      .then((res) => console.log(res));
  }
}
