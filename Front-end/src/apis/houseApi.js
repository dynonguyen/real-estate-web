import axiosClient from './axiosClient';

const HOUSE_API_URL = '/house';

const houseApi = {
  // api: Lấy danh sách nhà, type = -1 : all, trừ sản phẩm có id
  getHouseList: (type = -1, isHire = -1, limit = 1, id = '') => {
    const url = HOUSE_API_URL + '/list';
    return axiosClient.get(url, { params: { type, isHire, limit, id } });
  },

  // lấy nhà theo id
  getHouse: (id) => {
    const url = HOUSE_API_URL;
    return axiosClient.get(url, { params: { id } });
  },

  // filter
  filterHouse: (conditions, page = 1, perPage = 8) => {
    const url = HOUSE_API_URL + '/filter';
    return axiosClient.get(url, {
      params: { ...conditions, page, perPage },
    });
  },
};

export default houseApi;
