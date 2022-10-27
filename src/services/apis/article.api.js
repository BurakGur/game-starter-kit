export const articleApi = api => ({
  articleList() {
    return api.get('/article/list/1');
  },
  getArticle(articleId) {
    return api.get(`/article/${articleId}`);
  },
});
