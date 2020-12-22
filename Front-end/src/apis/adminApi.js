import axiosClient from './axiosClient';

const ADMIN_API_ENDPOINT = '/admin';

const adminApi = {
  // api: đăng nhập
  postLogin: (account) => {
    const url = ADMIN_API_ENDPOINT + '/login';
    return axiosClient.post(url, account);
  },
};

export default adminApi;
