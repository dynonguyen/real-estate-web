// fn: hàm rút gọn tên
const reduceName = (name, length = 64) => {
  let result = name;
  if (name && name.length >= length) {
    result = name.slice(0, length) + ' ...';
  }
  return result;
};

// fn: chuyên width màn hình window -> size theo ant design
const convertWidthScreen = (size = 576) => {
  if (size < 576) return 'xs';
  if (size >= 576 && size < 768) return 'sm';
  if (size >= 768 && size < 992) return 'md';
  if (size >= 992 && size < 1200) return 'lg';
  if (size >= 1200 && size < 1600) return 'xl';
  return 'xxl';
};

// fn: Format string theo dạng d/m/yyyy
function formatTime(time) {
  let t = time ? new Date(time) : Date.now();
  const y = t.getFullYear();
  const m = t.getMonth() + 1;
  const d = t.getDate();
  return `${d}/${m}/${y}`;
}

// fn: get query url
function getQueryVariable(query) {
  let result = {};
  if (query != '') {
    let q = query;
    if (q[0] === '?') q = q.slice(1, q.length);
    let arrQ = q.split('&');
    for (let i = 0; i < arrQ.length; ++i) {
      let pair = arrQ[i].split('=');
      if (pair.length == 2) {
        result[pair[0]] = pair[1];
      }
    }
  }
  return result;
}

export default {
  convertWidthScreen,
  reduceName,
  formatTime,
  getQueryVariable,
};
