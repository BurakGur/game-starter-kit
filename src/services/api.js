import {apiConfig} from '@config';
import {authApi, userApi, articleApi} from '@services';

const api = apiConfig;

api.auth = authApi(api);
api.user = userApi(api);
api.article = articleApi(api);

export default api;
