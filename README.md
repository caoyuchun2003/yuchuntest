# yuchuntest.com

曹宇春个人入口站：串起四个独立子站。

- https://yuchuntest.com/
- Learn → https://learn.yuchuntest.com/
- AI 学习平台 → https://ai.yuchuntest.com/
- 阅读课 → https://reading.yuchuntest.com/
- 金句 → https://one.yuchuntest.com/

## DNS（根域）

在百度云解析 **@** 记录指向 GitHub Pages（A 记录，以 [GitHub 文档](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site) 为准）。  
可选：`www` CNAME → `caoyuchun2003.github.io`。

仓库 Settings → Pages → Custom domain：`yuchuntest.com` → Enforce HTTPS。

## 部署

推送 `main` → GitHub Actions → Pages（静态根目录，无构建）。
