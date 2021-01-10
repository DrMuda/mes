import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import pages from './zh-CN/pages';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  // 'menu.入库管理':'入库管理',
  // 'menu.出库管理':'出库管理',
  // 'menu.入库管理.新增入库单':'新增入库单',
  // "menu.入库管理.仓库收货":"仓库收货",
  // "menu.入库管理.成品退货":"成品退货",
  // "menu.入库管理.入库单详细信息":"入库单详细信息",
  // "menu.出库管理.成品出库":"成品出库",
  // "menu.出库管理.其他出库":"其他出库",
  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
