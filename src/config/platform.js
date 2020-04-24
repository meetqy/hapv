/* eslint-disable */
export default [
  {
    site: "https://v.qq.com/",
    name: "腾讯视频",
    rule: `v\.qq\.com\/x\/cover\/`
  },
  // https://www.iqiyi.com/v_19rx1iy21w.html?vfrm=pcw_home&vfrmblk=B&vfrmrst=fcs_0_p11
  // https://www.iqiyi.com/v_19rr9m5fsk.html?vfrm=pcw_home&vfrmblk=CW&vfrmrst=812211_wdljxk_image2
  {
    site: "https://www.iqiyi.com/",
    name: "爱奇艺",
    rule: `iqiyi\.com\/.*?\.html`
  },
  // https://v.youku.com/v_nextstage/id_becfcfefca7e44dea5dd.html?s=becfcfefca7e44dea5dd&scm=20140719.rcmd.15319.show_becfcfefca7e44dea5dd
  {
    site: "https://www.youku.com/",
    name: "优酷",
    rule: `v\.youku\.com\/v_nextstage\/`
  }
];
