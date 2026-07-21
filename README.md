# yuchuntest.com

曹宇春个人主页:作品演示入口 + 技术咨询联系方式。

页面结构:定位与联系 → 擅长方向 → 可在线查看的项目案例 → 协作方式 → 联系。

- https://yuchuntest.com/
- Learn → https://learn.yuchuntest.com/
- AI 学习平台 → https://ai.yuchuntest.com/
- AI 聊天 → https://chat.yuchuntest.com/
- AI Agent → https://agent.yuchuntest.com/
- 视频创作 → https://video.yuchuntest.com/
- 邻里小店 → https://shop.yuchuntest.com/
- 阅读课 → https://reading.yuchuntest.com/
- 金句 → https://one.yuchuntest.com/
- 宇春书城 → https://libbook.yuchuntest.com/

## DNS（根域）

在百度云解析 **@** 记录指向 GitHub Pages（A 记录，以 [GitHub 文档](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site) 为准）。  
可选：`www` CNAME → `caoyuchun2003.github.io`。

仓库 Settings → Pages → Custom domain：`yuchuntest.com` → Enforce HTTPS。

子域 `video` CNAME → `caoyuchun2003.github.io`（指向 video-agent Pages）。

## 部署

推送 `main` → GitHub Actions → Pages（静态根目录，无构建）。
