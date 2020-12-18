const ROUTES = {
  HOME: '/',
  NOT_FOUND: '/not-found',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/login/forgot-pw',
};

// menu nhà bán trên navbar
const SALE_HOUSE_MENU = [
  { link: '', title: 'Bán nhà riêng' },
  { link: '', title: 'Bán căn hộ chung cư' },
  { link: '', title: 'Bán biệt thự' },
  { link: '', title: 'Bán nhà mặt phố' },
  { link: '', title: 'Bán đất nền' },
];

// menu nhà cho thuê trên navbar
const HIRE_HOUSE_MENU = [
  { link: '', title: 'Cho thuê nhà riêng' },
  { link: '', title: 'Cho thuê căn hộ' },
  { link: '', title: 'Cho thuê biệt thự' },
  { link: '', title: 'Cho thuê nhà mặt phố' },
  { link: '', title: 'Cho thuê đất nền' },
  { link: '', title: 'Cho thuê phòng trọ' },
  { link: '', title: 'Cho thuê cửa hàng' },
  { link: '', title: 'Cho thuê văn phòng' },
];

// gender options
const GENDER_OPTIONS = [
  { value: true, label: 'Nam' },
  { value: false, label: 'Nữ' },
];

export default {
  SALE_HOUSE_MENU,
  HIRE_HOUSE_MENU,
  ROUTES,
  // tuổi nhỏ nhất sử dụng app
  MIN_AGE: 18,
  REFRESH_TOKEN_KEY: 'refresh_token',
  MAX_VERIFY_CODE: 6,
  GENDER_OPTIONS,
  // thời gian delay khi chuyển trang
  DELAY_TIME: 750,
  // số lần đăng nhập sai tối đa
  MAX_FAILED_LOGIN_TIMES: 5,
  REFRESH_TOKEN: 'refresh_token',
};
