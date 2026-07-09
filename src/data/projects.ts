export interface ProjectMeta {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  cover: string;
  tags: string[];
}

export const projects: ProjectMeta[] = [
  {
    id: 'jihui',
    num: 'PROJECT 01',
    title: 'MH极绘',
    subtitle: '自研设计集成平台 · AI-Driven Design Hub',
    shortDesc: '一站式设计效率工具平台，覆盖日常80%的重复性设计劳动，用AI与自动化解放设计师的生产力，让创意回归创意本身',
    cover: '',
    tags: ['AI设计', '效率工具', '自动化', 'SaaS'],
  },
  {
    id: 'canvas',
    num: 'PROJECT 02',
    title: '无限画布',
    subtitle: 'AetherWorkbench · Infinite Canvas',
    shortDesc: '定价订阅 · 个人中心 · 团队协作 · 素材库 · 分镜创作',
    cover: '/images/canvas-cover.jpg',
    tags: ['SaaS', '工作台', '全屏观览', '交互设计'],
  },
  {
    id: 'aigc',
    num: 'PROJECT 03',
    title: 'B站独家签约创作者',
    subtitle: 'Ink & Soul · 墨刃纪 水墨武侠',
    shortDesc: 'Ink & Soul 暗色水墨武侠风设计系统，融合 Shuimo 水墨画传统与电影级 UI 界面',
    cover: '/bilibili/screen-home.png',
    tags: ['Bilibili', 'Ink & Soul', '水墨风', 'Design System', '动漫视觉'],
  },
  {
    id: 'mascot',
    num: 'PROJECT 04',
    title: '集团吉祥物IP',
    subtitle: 'Group Mascot IP Design',
    shortDesc: '全屏视频 · 概念解析 · 表情包 · 盲盒礼品',
    cover: '/images/gen-01.jpg',
    tags: ['IP设计', '表情包', '盲盒', '视频剪辑'],
  },
  {
    id: 'anniversary',
    num: 'PROJECT 05',
    title: '30周年庆典',
    subtitle: '30th Anniversary Visual',
    shortDesc: '30页设计规范 · 手册 · 视觉应用\n因集团保密特性，仅展示部分视觉规范与样机设计',
    cover: '/images/30周年模块/概念解析.jpg',
    tags: ['品牌设计', 'VI规范', '手册设计'],
  },
  {
    id: 'exhibition',
    num: 'PROJECT 06',
    title: '展会视觉',
    subtitle: 'Exhibition Archive',
    shortDesc: 'CIIF 工业精密 · CIOE 光电视觉 · CHTF 高科技生态\n因集团保密特性，仅展示部分视觉主KV设计\n观看更多 可关注 **大族激光官方公众号/官网**',
    cover: '/images/gen-08.jpg',
    tags: ['展会设计', '主视觉KV', '导视系统', 'CIIF', 'CIOE', 'CHTF'],
  },
  {
    id: 'ecom3c',
    num: 'PROJECT 07',
    title: '3C 电商视觉',
    subtitle: '3C E-Commerce Visual Design',
    shortDesc: 'AeroSound Pro · 全屏视频 · 10屏详情',
    cover: '/images/3c/ecom_01.jpg',
    tags: ['电商详情页', '3C数码', '产品渲染'],
  },

];

export const projectOrder = projects.map((p) => p.id);

export const getProjectMeta = (id: string): ProjectMeta | undefined =>
  projects.find((p) => p.id === id);
