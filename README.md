# 塔罗预测 (Tarot Prediction)

一个现代化的塔罗牌占卜网络应用，提供多语言支持和AI深度解读功能。

## ✨ 特性

- 🔮 **塔罗牌占卜**: 经典的三牌阵（过去、现在、未来）
- 🤖 **AI深度解读**: 基于OpenAI的个性化塔罗牌解释
- 🌍 **多语言支持**: 支持20种语言，包括中文、英文、西班牙语等
- 🎨 **现代化设计**: 使用Tailwind CSS和Framer Motion的响应式设计
- 📱 **移动端友好**: 完全响应式设计，支持所有设备
- 🌙 **深色模式**: 内置深色/浅色主题切换
- 📊 **每日限制**: 每天最多3次占卜，防止沉迷
- 🎯 **广告系统**: 插屏广告模拟，可轻松集成真实广告SDK
- 💾 **本地存储**: 占卜记录本地保存，保护隐私

## 🛠️ 技术栈

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **国际化**: next-intl
- **AI集成**: OpenAI API
- **测试**: Vitest + React Testing Library
- **代码质量**: ESLint + Prettier
- **包管理**: pnpm

## 🚀 快速开始

### 环境要求

- Node.js >= 20.0.0
- pnpm

### 安装依赖

```bash
pnpm install
```

### 环境变量设置

创建 `.env.local` 文件：

```env
# OpenAI API密钥（用于AI深度解读功能）
OPENAI_API_KEY=your_openai_api_key_here
```

> **注意**: 如果不设置OpenAI API密钥，AI深度解读功能将不可用，但基础占卜功能仍然正常工作。

### 开发模式

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
pnpm build
pnpm start
```

### 运行测试

```bash
pnpm test
```

### 代码检查和格式化

```bash
# ESLint检查
pnpm lint

# TypeScript类型检查
pnpm type-check

# 代码格式化
pnpm format
```

## 🌍 国际化

应用支持以下语言：

- 🇺🇸 English
- 🇨🇳 中文 (简体)
- 🇪🇸 Español
- 🇫🇷 Français
- 🇩🇪 Deutsch
- 🇮🇩 Bahasa Indonesia
- 🇻🇳 Tiếng Việt
- 🇹🇭 ไทย
- 🇯🇵 日本語
- 🇰🇷 한국어
- 🇧🇷 Português (Brasil)
- 🇵🇹 Português
- 🇮🇹 Italiano
- 🇷🇺 Русский
- 🇹🇷 Türkçe
- 🇸🇦 العربية
- 🇮🇳 हिन्दी
- 🇵🇭 Filipino
- 🇲🇾 Bahasa Malaysia
- 🇵🇱 Polski

### 添加新语言

1. 在 `messages/` 目录下创建新的语言文件
2. 在 `i18n.ts` 中添加新的locale
3. 在 `lib/cards.ts` 中为主要塔罗牌添加翻译

## 🎴 塔罗牌数据

应用包含完整的78张塔罗牌数据：

- **大阿卡纳**: 22张，包含多语言名称翻译
- **小阿卡纳**: 56张（当前为基础实现，可扩展）

每张牌包含：
- 正位和逆位含义
- 多语言名称翻译
- 图片路径（可自定义）
- 牌组和数字信息

## 🤖 AI集成

### OpenAI配置

AI深度解读功能使用OpenAI的GPT模型：

- **模型**: gpt-4o-mini（高效且成本优化）
- **温度**: 0.7（平衡创造性和一致性）
- **系统提示**: 专业塔罗大师人格设定
- **多语言**: 根据用户选择的语言生成解读

### 提示词设计

系统提示词将AI设定为：
- 国际知名的塔罗大师
- 具有深厚传统塔罗知识
- 能够提供实用建议
- 支持多语言解读

## 📱 广告集成

### 当前实现

应用包含插屏广告模拟组件：

- 3-5秒倒计时
- 跳过按钮（倒计时结束后显示）
- 进度条显示
- 动画效果

### 触发时机

1. **抽牌时**: 点击"抽取3张牌"后显示广告，关闭后显示牌面
2. **深度解读**: 点击"深度分析"后显示广告，关闭后调用AI解读

### 集成真实广告网络

要集成真实广告（如Google AdMob、Meta Audience Network等）：

1. 安装对应SDK
2. 替换 `components/InterstitialAd.tsx` 中的模拟内容
3. 配置广告单元ID
4. 添加适当的错误处理和回退逻辑

## 🏗️ 项目结构

```
├── app/                    # Next.js App Router页面
│   ├── [locale]/          # 国际化路由
│   │   ├── page.tsx       # 首页
│   │   ├── draw/          # 抽牌页面
│   │   ├── result/        # 结果页面
│   │   └── layout.tsx     # 布局组件
│   ├── api/               # API路由
│   │   └── ai-interpret/  # AI解读接口
│   └── globals.css        # 全局样式
├── components/            # React组件
│   ├── Header.tsx         # 头部组件
│   ├── ThemeProvider.tsx  # 主题提供者
│   └── InterstitialAd.tsx # 插屏广告组件
├── lib/                   # 工具函数和数据
│   ├── types.ts          # TypeScript类型定义
│   ├── cards.ts          # 塔罗牌数据
│   ├── spreads.ts        # 牌阵配置
│   ├── storage.ts        # 本地存储管理
│   └── interpret.ts      # 解读逻辑
├── messages/             # 国际化消息文件
├── test/                 # 测试文件
└── 配置文件...
```

## 🧪 测试

项目包含基础测试覆盖：

- **单元测试**: 卡牌解读逻辑
- **集成测试**: 牌阵构建功能
- **类型检查**: TypeScript严格模式

## 🚀 部署

### Vercel (推荐)

1. 连接GitHub仓库到Vercel
2. 设置环境变量 `OPENAI_API_KEY`
3. 部署将自动进行

### 其他平台

确保环境支持：
- Node.js 20+
- 环境变量配置
- 静态文件服务

## 🔧 配置说明

### vercel.json

指定Node.js 20运行时，确保与pnpm要求兼容。

### 环境变量

- `OPENAI_API_KEY`: OpenAI API密钥（可选）

## 🛣️ 路线图

- [ ] PWA支持（渐进式Web应用）
- [ ] 更多牌阵类型
- [ ] 用户账户系统
- [ ] 占卜历史云同步
- [ ] 社交分享功能增强
- [ ] 高级AI模型选项
- [ ] 完整小阿卡纳翻译
- [ ] 自定义牌背设计

## 🤝 贡献

欢迎提交Issue和Pull Request来改进此项目。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://motion.dev)
- [OpenAI API](https://openai.com/api)
- [next-intl](https://next-intl.dev)