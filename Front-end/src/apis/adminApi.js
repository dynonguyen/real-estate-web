import axiosClient from './axiosClient';

const ADMIN_API_ENDPOINT = '/admin';

const adminApi = {
  // api: đăng nhập
  postLogin: (account) => {
    const url = ADMIN_API_ENDPOINT + '/login';
    return axiosClient.post(url, account);
  },

  // api: lấy danh sách nhà
  getAllHouse: (page = 1, perPage = 8) => {
    const url = ADMIN_API_ENDPOINT + '/list-house';
    return axiosClient.get(url, { params: { page, perPage } });
  },

  // api: Xoá sản phẩm
  deleteHouse: (_id) => {
    const url = ADMIN_API_ENDPOINT + '/del-house';
    return axiosClient.delete(url, { params: { _id } });
  },

  // api: Cập nhật sản phẩm
  updateHouse: (house) => {
    const url = ADMIN_API_ENDPOINT + '/update-house';
    return axiosClient.put(url, house);
  },

  // api: lấy danh sách khách hàng
  getAllCustomer: (page, perPage) => {
    const url = ADMIN_API_ENDPOINT + '/list-customer';
    return axiosClient.get(url, { params: { page, perPage } });
  },
};

export default adminApi;
