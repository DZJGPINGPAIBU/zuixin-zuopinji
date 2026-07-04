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
    id: 'mascot',
    num: 'PROJECT 01',
    title: '集团吉祥物IP',
    subtitle: 'Group Mascot IP Design',
    shortDesc: '全屏视频 · 概念解析 · 表情包 · 盲盒礼品',
    cover: '/images/gen-01.jpg',
    tags: ['IP设计', '表情包', '盲盒', '视频剪辑'],
  },
  {
    id: 'anniversary',
    num: 'PROJECT 02',
    title: '30周年庆典',
    subtitle: '30th Anniversary Visual',
    shortDesc: '30页设计规范 · 手册 · 视觉应用',
    cover: '/images/30周年模块/概念解析.jpg',
    tags: ['品牌设计', 'VI规范', '手册设计'],
  },
  {
    id: 'exhibition',
    num: 'PROJECT 03',
    title: '展会视觉',
    subtitle: 'Exhibition Visual Design',
    shortDesc: '慕尼黑 · 上海工博会 · 光博会 · 电池展',
    cover: '/images/gen-08.jpg',
    tags: ['展会设计', '主视觉KV', '导视系统'],
  },
  {
    id: 'aigc',
    num: 'PROJECT 04',
    title: 'B站独家签约创作者',
    subtitle: '动漫视觉 · 内容创作',
    shortDesc: 'Bilibili · 动漫视觉 · 独家签约 · 内容创作',
    cover: '/images/gen-04.jpg',
    tags: ['Bilibili', '动漫', '视觉创作', 'UP主'],
  },
  {
    id: 'ecom3c',
    num: 'PROJECT 06',
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
