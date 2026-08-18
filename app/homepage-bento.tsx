"use client";

/* eslint-disable @next/next/no-img-element -- The approved report and continuous Bento landscape use direct image rendering. */

import { useEffect, useState } from "react";
import Link from "next/link";

const Arrow = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
    <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
  </svg>
);

const Check = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 18 18">
    <path d="m4 9.3 3 3 7-7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
  </svg>
);

const Shield = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <path d="M12 3.2 19 6v5.3c0 4.4-2.8 7.9-7 9.7-4.2-1.8-7-5.3-7-9.7V6l7-2.8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
    <path d="m8.7 12 2.1 2.1 4.6-4.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
  </svg>
);

const SectionLabel = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`rm3-label${light ? " rm3-label-light" : ""}`}><i />{children}</p>
);

const FeatureIcon = ({ type }: { type: "scan" | "schedule" | "finding" | "report" }) => (
  <span className={`rm3-feature-icon rm3-feature-icon-${type}`} aria-hidden="true"><i /></span>
);

const reportPanels = [
  {
    metric: "14",
    metricLabel: "項弱點",
    title: "整體風險概況",
    description: "一次掌握風險分布與網站目前的安全狀態。",
    rows: [["嚴重／高危", "0"], ["中危", "4"], ["低危", "10"]],
  },
  {
    metric: "04",
    metricLabel: "優先項目",
    title: "先處理真正重要的風險",
    description: "以風險等級與影響範圍建立清楚的修復順序。",
    rows: [["優先修復", "4"], ["持續追蹤", "10"], ["嚴重風險", "0"]],
  },
  {
    metric: "04",
    metricLabel: "修復路線",
    title: "具體修復方向",
    description: "從安全標頭、函式庫到 Cookie 屬性，直接轉化為修復行動。",
    rows: [["安全標頭", "01"], ["函式庫更新", "02"], ["資訊與 Cookie", "03–04"]],
  },
  {
    metric: "PDF",
    metricLabel: "可交付",
    title: "跨團隊共享同一份結論",
    description: "完整保留風險摘要、弱點證據、修復建議與驗證方向。",
    rows: [["風險摘要", "✓"], ["修復建議", "✓"], ["驗證方式", "✓"]],
  },
];

const RealReportPreview = ({ activeIndex }: { activeIndex: number }) => {
  const panel = reportPanels[activeIndex];

  return (
    <figure className="rm3-real-report" aria-label="Redmark 真實弱點掃描報告預覽">
      <div className="rm3-real-report-frame">
        <img
          alt="Redmark 掃描 wikirex.com 後產出的整體風險概況與修復路線建議"
          loading="lazy"
          src="/redmark-report-executive-summary.png"
        />
      </div>
      <aside className="rm3-report-analysis" key={activeIndex} aria-live="polite">
        <div className="rm3-report-gauge"><strong>{panel.metric}</strong><span>{panel.metricLabel}</span></div>
        <h3>{panel.title}</h3>
        <p>{panel.description}</p>
        <div className="rm3-report-analysis-rows">
          {panel.rows.map(([label, value]) => <span key={label}><i>{value}</i>{label}</span>)}
        </div>
      </aside>
      <figcaption><span>REAL REPORT</span><b>WIKIREX.COM · EXECUTIVE SUMMARY</b></figcaption>
    </figure>
  );
};

const painPoints = [
  {
    number: "01",
    label: "HIGH COST",
    title: "資安檢測，不該是一筆高昂成本",
    text: "傳統弱點掃描與顧問服務往往成本高、導入門檻高，讓持續性的安全檢測難以真正普及。",
  },
  {
    number: "02",
    label: "VISIBILITY GAP",
    title: "掃描有週期，風險沒有空窗期",
    text: "網站與服務持續變動，只靠人工或不定期檢測，很容易在兩次掃描之間留下風險空窗。",
  },
  {
    number: "03",
    label: "UNCLEAR PRIORITY",
    title: "發現漏洞，不代表知道怎麼修",
    text: "當結果缺乏清楚的風險分級與優先順序，團隊仍得花大量時間判斷哪些問題需要先處理。",
  },
];

const reportFeatures = [
  ["01", "掌握整體風險", "快速查看不同風險等級的弱點數量與分布，了解網站目前的安全狀態。"],
  ["02", "找出優先修復項目", "透過風險分級與弱點資訊，判斷需要優先處理的問題。"],
  ["03", "取得具體修復方向", "查看弱點說明、影響位置、修復步驟與驗證方式，減少團隊反覆查找資料的時間。"],
  ["04", "產出可交付報告", "下載完整弱掃報告，用於內部存檔、跨部門溝通與後續修復追蹤。"],
];

const figmaReportFeatures = [
  ["01｜產出 Redmark 專業報告", "Redmark 從資產全局角度出發，將生澀的技術語言轉化為清晰易懂、具備修復依據的專業弱掃報告，協助團隊快速掌握風險並推進修復。"],
  ["02｜掌握整體風險", "整合不同資產、掃描結果與風險分布，將分散的弱點資訊彙整成清晰的安全全貌，協助團隊快速了解目前的整體狀態。"],
  ["03｜找出優先修復項目", "依據風險等級、影響範圍與資產重要性，整理出最需要優先處理的問題，讓修復資源能夠投入真正關鍵的風險。"],
  ["04｜取得具體修復方向", "針對每項弱點提供原因分析、修復步驟與驗證方式，將掃描發現轉化為 IT 與開發團隊可以直接執行的修復行動。"],
];

const values = [
  ["降低持續檢測成本", "依照資產額度與安全覆蓋需求選擇方案，在方案額度內不限制掃描次數。"],
  ["更快開始掃描", "建立網站後即可發起任務，不必每次重新安裝工具、準備環境或調整複雜設定。"],
  ["更容易採取行動", "以清楚的風險分級、弱點證據與修復建議，協助團隊更快判斷處理順序。"],
];

const plans = [
  ["Standard", "標準版", "適合準備建立定期網站弱點掃描流程的團隊。", "ESSENTIAL COVERAGE"],
  ["Pro", "進階版", "適合需要更深入檢測與更完整安全覆蓋的團隊。", "ADVANCED COVERAGE"],
  ["Customized", "客製版", "適合具有特殊資產規模、部署方式或企業安全需求的組織。", "ENTERPRISE NEEDS"],
];

export default function HomepageBento({ reportVariant = "current" }: { reportVariant?: "current" | "figma" }) {
  const loginUrl = process.env.NEXT_PUBLIC_WEAKSCAN_LOGIN_URL || "";

  const [activeReportFeature, setActiveReportFeature] = useState(0);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".rm3 [data-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="rm3">
      <section className="rm3-pain rm3-section" data-nav-surface="light" id="challenge" aria-labelledby="rm3-pain-title">
        <div className="rm3-shell">
          <SectionLabel>THE PROBLEM</SectionLabel>
          <div className="rm3-split-heading" data-reveal>
            <h2 id="rm3-pain-title">弱點掃描，不該只是<br />偶爾進行的檢查</h2>
            <p>網站持續改版、功能不斷更新，每一次變更都可能產生新的安全風險。當掃描成本過高、工具過於複雜，團隊就很難維持固定的檢測頻率。</p>
          </div>
          <div className="rm3-pain-mosaic" data-reveal>
            {painPoints.map(({ number, label, title, text }, index) => (
              <article className={`rm3-pain-card rm3-pain-card-${index + 1}`} key={number}>
                <div className="rm3-pain-card-top"><span>{number}</span><em>{label}</em></div>
                <div className="rm3-pain-pattern" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
                <div className="rm3-pain-card-copy">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="rm3-pain-conclusion" data-reveal>
            安全檢測真正困難的，<br className="rm3-mobile-break" />
            從來不是掃一次，<br className="rm3-mobile-break" />
            而是如何<span className="rm3-conclusion-highlight">持續做下去</span>。
          </p>
        </div>
      </section>

      <section className="rm3-capabilities rm3-section" data-nav-surface="light" id="platform" aria-labelledby="rm3-cap-title">
        <div className="rm3-shell">
          <SectionLabel>ONE PLATFORM, LESS COMPLEXITY</SectionLabel>
          <div className="rm3-capability-heading" data-reveal>
            <h2 id="rm3-cap-title">從建立任務到取得報告，<br />都在同一個平台完成</h2>
            <p>Redmark 將掃描執行、定期排程、弱點查看與報告產出整合在一起，減少安裝工具、管理環境及手動整理結果的時間。</p>
          </div>
          <div className="rm3-bento" data-reveal>
            <div className="rm3-bento-landscape" aria-hidden="true">
              <img src="/bento-snow-mountain.jpg" alt="" />
            </div>
            <div className="rm3-bento-gutters" aria-hidden="true">
              <i className="is-top-vertical" />
              <i className="is-bottom-vertical" />
            </div>
            <div className="rm3-bento-row rm3-bento-row-top">
            <article className="rm3-bento-card rm3-bento-scan">
              <div className="rm3-bento-copy"><FeatureIcon type="scan" /><span>01 · SCAN</span><h3>隨時發起掃描</h3><p>選擇資產與掃描類型，快速啟動一次完整的安全檢測。</p></div>
              <div className="scan-glass-panel">
                <img
                  alt="Redmark 掃描目標與掃描類型預覽"
                  height="360"
                  src="/assets/redmark-scan-illustration-v5.svg"
                  width="760"
                />
              </div>
            </article>
            <article className="rm3-bento-card rm3-bento-schedule">
              <div className="rm3-bento-copy"><FeatureIcon type="schedule" /><span>02 · SCHEDULE</span><h3>自動定期檢測</h3><p>依照網站維運需求設定執行週期，讓弱點掃描自動進行，不再依賴人工記憶。</p></div>
                <img
                  alt="Redmark 定期掃描排程預覽"
                  className="rm3-schedule-preview"
                  height="460"
                  src="/assets/redmark-schedule-minimal-v2.svg"
                  width="760"
                />
            </article>
            </div>
            <div className="rm3-bento-row rm3-bento-row-bottom">
            <article className="rm3-bento-card rm3-bento-findings">
              <div className="rm3-bento-copy"><FeatureIcon type="finding" /><span>03 · FINDINGS</span><h3>集中查看弱點</h3><p>透過風險等級、OWASP 分類、影響位置與弱點實例，快速理解每一項問題。</p></div>
              <img
                alt="Redmark 弱點詳情與修復建議預覽"
                className="rm3-findings-preview"
                height="460"
                src="/assets/redmark-findings-illustration-v3.svg"
                width="760"
              />
            </article>
            <article className="rm3-bento-card rm3-bento-report">
              <div className="rm3-bento-copy"><FeatureIcon type="report" /><span>04 · REPORT</span><h3>下載完整報告</h3><p>整理弱點與修復建議，快速產出可交付的安全報告。</p></div>
              <img
                alt="Redmark 可下載弱掃報告預覽"
                className="rm3-report-preview"
                height="460"
                src="/assets/redmark-report-illustration-v2.svg"
                width="760"
              />
            </article>
            </div>
          </div>
          <a className="rm3-text-link" href="#report">查看完整產品功能 <Arrow /></a>
        </div>
      </section>

      {reportVariant === "figma" ? (
      <section className="rm3-report-v2 rm3-section" data-nav-surface="light" id="report" aria-labelledby="rm3-report-v2-title">
        <span className="rm3-anchor-target" id="solutions" aria-hidden="true" />
        <div className="rm3-shell">
          <div className="rm3-report-v2-label" data-reveal><SectionLabel>ACTIONABLE REPORTING</SectionLabel></div>
          <div className="rm3-report-v2-heading" data-reveal>
            <p>Redmark 將複雜的掃描結果整理成容易理解、能夠採取行動的弱掃報告，協助 IT、開發與安全團隊快速確認問題並安排修復。</p>
            <h2 id="rm3-report-v2-title">不只告訴你哪裡有問題，<br />也說清楚下一步</h2>
          </div>
          <div className="rm3-report-v2-layout" data-reveal>
            <div className="rm3-report-v2-list" aria-label="弱掃報告功能">
              {figmaReportFeatures.map(([title, text], index) => (
                <button
                  aria-pressed={activeReportFeature === index}
                  className={activeReportFeature === index ? "is-active" : ""}
                  key={title}
                  onClick={() => setActiveReportFeature(index)}
                  type="button"
                >
                  <span className="rm3-report-v2-item-text">
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </span>
                </button>
              ))}
            </div>
            <figure className="rm3-report-v2-preview">
              <div className="rm3-report-v2-glass">
                <div className="rm3-report-v2-window-bar" aria-hidden="true"><i /><i /><i /></div>
                <div className="rm3-report-v2-viewport">
                  <img alt="Redmark 弱點掃描報告完整封面預覽" src="/redmark-report-cover-full.png" />
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>
      ) : (
      <section className="rm3-report rm3-section" data-nav-surface="light" id="report" aria-labelledby="rm3-report-title">
        <span className="rm3-anchor-target" id="solutions" aria-hidden="true" />
        <div className="rm3-report-glow" aria-hidden="true" />
        <div className="rm3-shell rm3-report-layout">
          <div className="rm3-report-copy" data-reveal>
            <SectionLabel>ACTIONABLE REPORTING</SectionLabel>
            <h2 id="rm3-report-title">不只告訴你哪裡有問題，<br />也說清楚下一步</h2>
            <p>Redmark 將複雜的掃描結果整理成容易理解、能夠採取行動的弱掃報告，協助 IT、開發與安全團隊快速確認問題並安排修復。</p>
            <div className="rm3-report-list" aria-label="弱掃報告功能">
              {reportFeatures.map(([number, title, text], index) => (
                <button
                  aria-pressed={activeReportFeature === index}
                  className={activeReportFeature === index ? "is-active" : ""}
                  key={number}
                  onClick={() => setActiveReportFeature(index)}
                  type="button"
                >
                  <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div>
                </button>
              ))}
            </div>
          </div>
          <div className="rm3-report-stage" data-reveal><RealReportPreview activeIndex={activeReportFeature} /></div>
        </div>
      </section>
      )}

      <section className="rm3-values rm3-section" data-nav-surface="light" id="resources" aria-labelledby="rm3-values-title">
        <div className="rm3-shell">
          <SectionLabel>BUILT FOR CONTINUOUS SCANNING</SectionLabel>
          <div className="rm3-split-heading" data-reveal>
            <h2 id="rm3-values-title">更常掃描，不必增加<br />同等的維運負擔</h2>
            <p>Redmark 降低弱點掃描的成本與操作門檻，讓原本低頻、依賴專家的檢測工作，成為團隊可以持續執行的日常流程。</p>
          </div>
          <div className="rm3-value-grid" data-reveal>
            {values.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <aside className="rm3-authorized" data-reveal>
            <div><Shield /></div><span>AUTHORIZED ASSETS ONLY</span><h3>只掃描已取得授權的資產</h3><p>每一次弱點掃描都應建立在明確授權與可控範圍之上。使用 Redmark 前，請確認已取得受掃資產的合法授權，並依照實際服務承載能力安排掃描。</p>
          </aside>
        </div>
      </section>

      <section className="rm3-pricing rm3-section" data-nav-surface="light" id="pricing" aria-labelledby="rm3-pricing-title">
        <div className="rm3-shell">
          <div className="rm3-centered-heading" data-reveal>
            <SectionLabel>SIMPLE, SCALABLE PLANS</SectionLabel>
            <h2 id="rm3-pricing-title">依照資產規模與安全覆蓋，<br />選擇適合的方案</h2>
            <p>Redmark 依掃描類型、安全覆蓋程度與資產額度提供不同方案。方案額度內不限制掃描次數，讓團隊能依照實際需求持續進行安全檢測。</p>
          </div>
          <div className="rm3-plan-grid" data-reveal>
            {plans.map(([english, chinese, text, tag], index) => (
              <article className={index === 1 ? "is-featured" : ""} key={english}>
                {index === 1 && <small>RECOMMENDED</small>}
                <span>{tag}</span><h3>{english}<em>{chinese}</em></h3><p>{text}</p>
                <div><i><Check /></i>方案額度內不限掃描次數</div>
                <a href="#start">了解方案 <Arrow /></a>
              </article>
            ))}
          </div>
          <div className="rm3-pricing-actions" data-reveal><a className="primary nav-temp-hidden" href="#start" style={{ display: "none" }}>查看方案與價格 <Arrow /></a><a className="nav-temp-hidden" href="#contact" style={{ display: "none" }}>聯絡我們</a></div>
        </div>
      </section>

      <section className="rm3-final" data-nav-surface="dark" id="start" aria-labelledby="rm3-final-title">
        <div className="rm3-final-image" aria-hidden="true" />
        <div className="rm3-final-grade" aria-hidden="true" />
        <div className="rm3-final-glass" data-reveal>
          <span>START WITH ONE WEBSITE</span>
          <h2 id="rm3-final-title">從第一個網站開始，建立持續弱掃流程</h2>
          <p>以更低的執行成本持續檢測網站弱點，更早發現問題，也讓每一次修復都有清楚的方向。</p>
          <a href={loginUrl || "#early-access"}>立刻開始掃描 <Arrow /></a>
        </div>
      </section>

      <footer className="rm3-footer" data-nav-surface="dark" id="contact">
        <div className="rm3-footer-main">
          <div className="rm3-footer-brand"><Link aria-label="Redmark 首頁" className="rm3-footer-logo" href="/"><img alt="Redmark" src="/redmark-logo-dark.svg" /></Link><p>Redmark 是一套低成本、快速且容易上手的自動化弱點掃描平台，協助企業將低頻的弱點檢測，轉化為可持續執行的日常安全流程。</p></div>
          <div className="rm3-footer-links">
            <a className="nav-temp-hidden" href="#platform" style={{ display: "none" }}>產品功能</a>
            <a className="nav-temp-hidden" href="#pricing" style={{ display: "none" }}>價格方案</a>
            <a className="nav-temp-hidden" href="#contact" style={{ display: "none" }}>聯繫我們</a>
          </div>
        </div>
        <div className="rm3-footer-bottom"><span>© 2026 REDMARK</span><span>VULNERABILITY SCANNING PLATFORM</span></div>
      </footer>
    </div>
  );
}
