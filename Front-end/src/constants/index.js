const ROUTES = {
  HOME: '/',
  NOT_FOUND: '/not-found',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/login/forgot-pw',
  HOUSE: '/house',
  ACCOUNT: '/accounts',
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

// các loại diện tích cho selection filter
const SQUARE_TYPES = [
  { type: 0, title: 'Tất cả' },
  { type: 1, title: 'Dưới 30 m2' },
  { type: 2, title: '30 - 50 m2' },
  { type: 3, title: '50 - 80 m2' },
  { type: 4, title: '80 - 200 m2' },
  { type: 5, title: '200 - 350 m2' },
  { type: 6, title: '350 - 500 m2' },
  { type: 7, title: '500 - 1000 m2' },
  { type: 8, title: 'Trên 1000 m2' },
];

// loại bất động sản
const REAL_ESTATE_TYPES = [
  { type: 0, title: 'Căn hộ chung cư' },
  { type: 1, title: 'Căn hộ trung cấp' },
  { type: 2, title: 'Căn hộ mini' },
  { type: 3, title: 'Căn hộ cao cấp' },
  { type: 4, title: 'Căn hộ tập thể' },
  { type: 5, title: 'Căn hộ Penthouse' },
  { type: 6, title: 'Nhà biệt thự' },
  { type: 7, title: 'Đất nền' },
  { type: 8, title: 'Nhà riêng' },
  { type: 9, title: 'Văn phòng' },
  { type: 10, title: 'Bất động sản khác' },
];

// Các loại giá theo mức giá bán
const SALE_PRICE_TYPES = [
  { type: 0, title: 'Thoả thuận' },
  { type: 1, title: 'Dưới 500 triệu' },
  { type: 2, title: '500 - 800 triệu' },
  { type: 3, title: '800 triệu - 1 tỷ' },
  { type: 4, title: 'Từ 1 - 2 tỷ' },
  { type: 5, title: 'Từ 2 - 3 tỷ' },
  { type: 6, title: 'Từ 3 - 4 tỷ' },
  { type: 7, title: 'Từ 4 - 5 tỷ' },
  { type: 8, title: 'Từ 5 - 7 tỷ' },
  { type: 9, title: 'Từ 7 - 10 tỷ' },
  { type: 10, title: 'Từ 10 - 20 tỷ' },
  { type: 11, title: 'Trên 20 tỷ' },
];

// Các loại giá theo tháng
const HIRE_PRICE_TYPES = [
  { type: 0, title: 'Thoả thuận' },
  { type: 1, title: 'Dưới 1 triệu' },
  { type: 2, title: 'Từ 1 - 3 triệu' },
  { type: 3, title: 'Từ 3 - 5 triệu' },
  { type: 4, title: 'Từ 5 - 10 triệu' },
  { type: 5, title: 'Từ 10 - 20 triệu' },
  { type: 6, title: 'Từ 20 - 50 triệu' },
  { type: 7, title: 'Từ 50 - 150 triệu' },
  { type: 8, title: 'Trên 150 triệu' },
];

export default {
  SALE_HOUSE_MENU,
  HIRE_HOUSE_MENU,
  ROUTES,
  SQUARE_TYPES,
  REAL_ESTATE_TYPES,
  SALE_PRICE_TYPES,
  HIRE_PRICE_TYPES,

  // tuổi nhỏ nhất sử dụng app
  MIN_AGE: 18,
  REFRESH_TOKEN_KEY: 'refresh_token',
  REFRESH_TOKEN: 'refresh_token',
  MAX_VERIFY_CODE: 6,
  GENDER_OPTIONS,
  // số lần đăng nhập sai tối đa
  MAX_FAILED_LOGIN_TIMES: 5,

  // thời gian delay khi chuyển trang (tăng UX)
  DELAY_TIME: 500,
  COMMENT_PER_PAGE: 8,
  MAX_LEN_COMMENT: 1000,
};
