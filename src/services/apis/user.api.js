export const userApi = api => ({
  me() {
    return api.get('/user/me');
  },
});
