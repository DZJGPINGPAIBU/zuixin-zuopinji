/* ===== Personal Info ===== */
export const personalInfo = {
  name: '黄选坤',
  nameEn: 'Xuankun Huang',
  age: 28,
  city: '深圳',
  email: '1157967122@qq.com',
  phone: '18024558356',
  role: 'AI品牌视觉设计',
  salary: '18-30K',
  avatar: './images/简历_p1_img3.png',
};

export const stats = [
  { value: 5, suffix: '年', label: '工作经验' },
  { value: 30, suffix: '万+', label: '全网粉丝' },
  { value: 98, suffix: '%', label: '考证通过率' },
  { value: 50, suffix: '%', label: 'AI效率提升' },
];

/* ===== Tabs ===== */
export const tabData = [
  { id: 'experience', label: '工作经历', num: '01' },
  { id: 'skills', label: '专业技能', num: '02' },
  { id: 'education', label: '教育 & 荣誉', num: '03' },
];

/* ===== Work Experience ===== */
export interface WorkMetric {
  value: string;   // e.g. "35%", "50+套", "320+人次", "从0到1"
  label: string;   // short label
  desc: string;    // full description
}

export interface WorkEntry {
  year: string;
  company: string;
  role: string;
  /** @deprecated kept for reference; use `metrics` for display */
  highlights: string[];
  metrics: WorkMetric[];
  tags: string[];
}

export const workData: WorkEntry[] = [
  {
    year: '2024.08 — 至今',
    company: '大族激光科技产业集团',
    role: '总部AI品牌视觉设计',
    highlights: [],
    metrics: [
      {
        value: '35%',
        label: '品牌视觉辨识度提升',
        desc: '担任集团30周年庆典总视觉设计师，主导周年专属LOGO创作、标准化VI手册编制，统筹线上线下全场景宣传物料，覆盖全国20+子公司、30+应用场景。',
      },
      {
        value: '10+场',
        label: '国内外顶级行业大展',
        desc: '独立全权负责深圳光博会、上海工博会、德国慕尼黑工博会、新加坡工博会等顶级大展视觉设计，覆盖1000-3000㎡展区，展会品牌曝光量提升40%。',
      },
      {
        value: '99%',
        label: '物料落地准确率',
        desc: '单场输出标准化物料200+件，物料落地准确率达99%，确保每次展会视觉零失误交付。',
      },
      {
        value: '50+衍生',
        label: 'IP全案设计 · 3项国家专利',
        desc: '主导集团吉祥物"小族"IP全案设计，拓展8大应用场景、50+衍生版本，成功申请3项国家版权与外观专利，IP物料累计应用超2万份。',
      },
      {
        value: '70%',
        label: 'AI全链路提效 · 产能翻倍',
        desc: '牵头搭建标准化AI设计SOP，基于Claude Code/Codex打通平面与视频双链路，自研集团内部AI设计平台，沉淀20+套可复用模板，设计产能提升50%+、视频产出效率提升70%。',
      },
      {
        value: '320+人次',
        label: '跨部门AI设计培训',
        desc: '常态化开展AI设计专项培训，累计覆盖全集团15+事业部，推动AI设计能力在组织内规模化落地。',
      },
    ],
    tags: ['PS', 'AI', 'Figma', '即梦', 'Lovart', 'Nano Banana', 'Seedance', 'Claude Code/Codex', 'Coze', 'Dify', 'SD2'],
  },
  {
    year: '2022.08 — 2024.08',
    company: '深圳市奋达职业技术学校',
    role: '平面设计师 / 设计课程主讲教师',
    highlights: [],
    metrics: [
      {
        value: '1200+',
        label: '累计授课课时',
        desc: '担任美术与设计类课程主讲教师，主讲Photoshop平面设计、电商美工等核心课程，累计授课超1200课时，覆盖多届学生。',
      },
      {
        value: '10+',
        label: '校企联合实战项目',
        desc: '负责全学院品牌视觉设计类工作，搭建院校线上线下品牌视觉体系，联合企业落地实战项目10+个，让学生在校期间积累真实商业经验。',
      },
      {
        value: '98%',
        label: '职业考证通过率',
        desc: '专项辅导设计类一级职业资格考证，精细化教学设计 + 一对一考前辅导，实现考证通过率98%。',
      },
      {
        value: '省级',
        label: '教师技能大赛获奖',
        desc: '获评骨干教师，代表区域参加广东省教师技能大赛并获奖，教学设计能力获省级认可。',
      },
    ],
    tags: ['Photoshop', 'Illustrator', '教学设计', '品牌VI'],
  },
  {
    year: '2021.07 — 2022.08',
    company: '惠州市侨邦教育',
    role: '品牌设计主管',
    highlights: [],
    metrics: [
      {
        value: '从0到1',
        label: '品牌视觉体系搭建',
        desc: '全权统筹企业品牌战略建设与视觉规范统一，从0到1搭建完整品牌视觉体系，输出VI手册、宣传物料、线上推广素材等300+件，建立品牌视觉标准。',
      },
      {
        value: '10+',
        label: '全渠道媒介覆盖',
        desc: '统筹官网、公众号、小程序、宣传册、海报、展架、户外广告等10+媒介的品牌视觉输出，确保各触点品牌形象统一。',
      },
      {
        value: '40%',
        label: '设计需求响应效率提升',
        desc: '优化跨部门设计需求对接流程，标准化需求brief → 排期 → 交付 → 复盘闭环，跨部门设计需求响应效率提升40%。',
      },
      {
        value: '3000+人次',
        label: '大型品牌活动触达',
        desc: '策划并落地多场大型招生活动与品牌推广活动视觉方案，单场活动视觉触达3000+人次，有效助力招生转化与品牌认知。',
      },
    ],
    tags: ['Brand VI', '品牌战略', '平面设计', '团队管理'],
  },
];

/* ===== Skills ===== */
export const skillCategories = [
  {
    title: '设计核心',
    items: [
      { name: 'Brand VI', level: 95 },
      { name: 'IP Design', level: 90 },
      { name: 'LOGO Design', level: 92 },
      { name: '展会全案视觉', level: 92 },
    ],
  },
  {
    title: 'AI & 数字创意',
    items: [
      { name: 'AIGC / AI创意', level: 90 },
      { name: 'Claude Code/Codex', level: 88 },
      { name: 'AI视频流水线', level: 90 },
      { name: 'Seedance / Coze', level: 82 },
    ],
  },
  {
    title: '工具 & 执行',
    items: [
      { name: 'PS / AI / Figma', level: 95 },
      { name: '即梦 / Lovart', level: 88 },
      { name: '视频拍摄剪辑', level: 85 },
      { name: '跨部门培训', level: 90 },
    ],
  },
];

/* ===== Education ===== */
export const education = {
  school: '广东白云学院',
  degree: '本科 · 环境艺术设计',
  year: '2017 — 2021',
};

/* ===== Certifications ===== */
export const awards = [
  '广告设计高级工（国家认证）',
  '宝安区骨干教师',
  '广东省教师技能大赛获奖',
  '3项国家版权与外观专利',
  'B站独家签约AI动漫UP主',
  '全网粉丝30万+，总累计播放量超800万+',
];
