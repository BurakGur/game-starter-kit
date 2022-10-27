export const authApi = api => ({
  login(email, password) {
    return api.post('/user/login', {
      email,
      password,
    });
  },
});
