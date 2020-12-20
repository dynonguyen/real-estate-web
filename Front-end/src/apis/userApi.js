import axiosClient from './axiosClient';

const USER_API_URL = '/user';

const userApi = {
  //get user
  getUser: () => {
    const url = USER_API_URL;
    return axiosClient.get(url);
  },

  // get broker
  getBrokerList: () => {
    const url = USER_API_URL + '/broker/all';
    return axiosClient.get(url);
  },
};

export default userApi;
