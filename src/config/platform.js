/* eslint-disable */
export default [
  {
    site: "https://v.qq.com/",
    name: "腾讯视频",
    enName: "qq",
    rule: `v\.qq\.com\/x\/cover\/`,
    themeColor: "#ff5c38"
  },
  // https://www.iqiyi.com/v_19rx1iy21w.html?vfrm=pcw_home&vfrmblk=B&vfrmrst=fcs_0_p11
  // https://www.iqiyi.com/v_19rr9m5fsk.html?vfrm=pcw_home&vfrmblk=CW&vfrmrst=812211_wdljxk_image2
  {
    site: "https://www.iqiyi.com/",
    name: "爱奇艺",
    enName: "iqiyi",
    rule: `iqiyi\.com\/.*?\.html`,
    themeColor: "#00be06"
  },
  // https://v.youku.com/v_nextstage/id_becfcfefca7e44dea5dd.html?s=becfcfefca7e44dea5dd&scm=20140719.rcmd.15319.show_becfcfefca7e44dea5dd
  // https://v.youku.com/v_show/id_XNDY0NjAyNDQ2NA==.html?s=ecebf757788a46b79267&scm=20140719.rcmd.15319.show_ecebf757788a46b79267
  {
    site: "https://www.youku.com/",
    name: "优酷",
    enName: "youku",
    rule: `(v\.youku\.com\/v_nextstage\/)|(v\.youku\.com\/v_show\/)`,
    themeColor: "#0d9bff"
  },
  // https://www.mgtv.com/b/330994/7823556.html?fpa=15801&fpos=2&lastp=ch_home
  // https://www.mgtv.com/b/337155/7965280.html?fpa=15801&fpos=3&lastp=ch_home
  {
    site: "https://www.mgtv.com/",
    name: "芒果TV",
    enName: "mgtv",
    rule: `mgtv\.com\/b`,
    themeColor: "#ff5f00"
  },
  {
    site: "https://www.le.com/",
    name: "乐视TV",
    enName: "le",
    rule: `le\.com\/ptv\/vplay\/`,
    themeColor: "#ff5f00"
  }
];
