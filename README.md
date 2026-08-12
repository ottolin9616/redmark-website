# Redmark website

Redmark 的正式產品官網。專案目前只有一個公開頁面：根路由 `/`。

這個首頁就是先前確認的 Bento 版本，包含山景 Hero、視差動畫、連續雪山 Bento、報告互動、方案區與 Early Access CTA。舊版首頁、實驗 route 與 prototype 已移除。

## 技術架構

- Next.js App Router
- React 19
- TypeScript
- Vinext / Cloudflare Workers
- Tailwind CSS PostCSS（僅作為全域 CSS pipeline）
- ChatGPT Sites hosting

## 專案結構

```text
app/
  layout.tsx             全站 metadata、字體與 root layout
  page.tsx               唯一正式 route：/
  redmark-hero.tsx       Navbar、Hero、視差與導覽明暗切換
  homepage-bento.tsx     Hero 以下的正式首頁內容與互動
  globals.css            正式首頁使用的全域樣式
public/
  mountain-background.jpg
  redmark-dashboard-en-real.png
  bento-snow-mountain.jpg
  redmark-report-executive-summary.png
  favicon.svg
worker/index.ts           Vinext Cloudflare Worker 入口
```

## 本機開發

需要 Node.js `>=22.13.0`。

```bash
npm ci
npm run dev
```

## 驗證

```bash
npm run lint
npm test
```

`npm test` 會先執行 production build，再確認：

- `/` 正常回傳正式 Bento 首頁
- 舊首頁與 prototype routes 回傳 404
- 正式首頁引用的本機圖片均存在
- Sites artifact 與開發預覽 metadata 正常

## 維護原則

- `/` 是唯一正式首頁，不要以 redirect 或平行 route 維護另一份首頁。
- 視覺調整應直接修改現有 Hero 或 Bento component，避免複製出新的首頁版本。
- 刪除 component、selector 或 asset 前，先確認 `app/page.tsx`、`app/redmark-hero.tsx`、`app/homepage-bento.tsx` 與 `app/globals.css` 的依賴。
- 必須同時檢查桌面與手機版，並保留 `prefers-reduced-motion` 行為。
- 新增本機資產後，請同步補充測試或維護文件。
