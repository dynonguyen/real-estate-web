import axiosClient from './axiosClient';

const POST_API_URL = '/post';

const postApi = {
  // lấy bài đăng nhà theo id
  getPost: (id) => {
    const url = POST_API_URL;
    return axiosClient.get(url, { params: { id } });
  },
};

export default postApi;
