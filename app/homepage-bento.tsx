"use client";

/* eslint-disable @next/next/no-img-element -- The approved report and continuous Bento landscape use direct image rendering. */

import { useEffect, useState } from "react";

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

const WindowTop = ({ path }: { path: string }) => (
  <div className="rm3-window-top">
    <span aria-hidden="true"><i /><i /><i /></span>
    <em>{path}</em>
    <b><i /> ONLINE</b>
  </div>
);

const ScanMock = () => (
  <div className="rm3-scan-mock" aria-label="新增掃描模擬介面">
    <WindowTop path="redmark.app / scans / new" />
    <div className="rm3-ui-shell">
      <aside aria-hidden="true"><strong>R</strong><i /><i /><i /><i /></aside>
      <div className="rm3-scan-form">
        <div className="rm3-ui-heading"><span>新增掃描</span><small>建立新的網站弱點掃描任務</small></div>
        <label>掃描目標</label>
        <div className="rm3-target-input"><span>https://www.example.com</span><i>已驗證</i></div>
        <label>掃描類型</label>
        <div className="rm3-type-options">
          <span className="is-selected"><i />Web 基礎弱點掃描<small>快速檢查常見網站風險</small></span>
          <span><i />Web 動態弱點掃描<small>更深入的主動式安全檢測</small></span>
        </div>
        <button type="button">開始掃描 <Arrow /></button>
      </div>
    </div>
  </div>
);

const ScheduleMock = () => (
  <div className="rm3-schedule-mock" aria-label="定期掃描排程模擬介面">
    <div className="rm3-card-ui-head"><span>定期掃描</span><b>啟用中</b></div>
    <p>每週自動檢查，不錯過系統變更後產生的新風險。</p>
    <div className="rm3-schedule-chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
    <div className="rm3-week"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
    <div className="rm3-next-run"><span><i />下次執行</span><strong>週三 02:00</strong></div>
  </div>
);

const FindingMock = () => (
  <div className="rm3-finding-mock" aria-label="弱點詳情模擬介面">
    <div className="rm3-card-ui-head"><span>弱點詳情</span><b className="rm3-high">高風險</b></div>
    <div className="rm3-finding-heading"><div><h4>Content Security Policy 未設定</h4><div className="rm3-finding-meta"><span>OWASP A05</span><span>安全性設定錯誤</span></div></div><strong><b>4</b><small>優先項目</small></strong></div>
    <div className="rm3-evidence"><small>影響位置</small><code>https://example.com/account</code></div>
    <div className="rm3-fix-row"><span><Check />修復建議與驗證方式</span><Arrow /></div>
  </div>
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

const BentoReportPreview = () => (
  <div className="rm3-bento-report-preview" aria-label="Redmark 弱點掃描報告已完成">
    <div className="rm3-bento-report-orb" aria-hidden="true"><strong>14</strong><span>項弱點</span></div>
    <div className="rm3-bento-report-chip">
      <span>REAL REPORT</span>
      <strong>14 項弱點已整理</strong>
      <small>PDF · WIKIREX.COM</small>
    </div>
  </div>
);

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
    title: "風險不會等下一次掃描",
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

export default function HomepageBento() {
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
          <p className="rm3-pain-conclusion" data-reveal><span>真正的阻力</span>不是缺少掃描工具，而是複雜度讓安全檢測難以持續。</p>
        </div>
      </section>

      <section className="rm3-capabilities rm3-section" data-nav-surface="light" id="platform" aria-labelledby="rm3-cap-title">
        <div className="rm3-shell">
          <div className="rm3-capability-heading" data-reveal>
            <div>
              <SectionLabel>ONE PLATFORM, LESS COMPLEXITY</SectionLabel>
              <h2 id="rm3-cap-title">從建立任務到取得報告，<br />都在同一個平台完成</h2>
            </div>
            <p>Redmark 將掃描執行、定期排程、弱點查看與報告產出整合在一起，減少安裝工具、管理環境及手動整理結果的時間。</p>
          </div>
          <div className="rm3-bento" data-reveal>
            <div className="rm3-bento-landscape" aria-hidden="true">
              <img src="/bento-snow-mountain.jpg" alt="" />
            </div>
            <article className="rm3-bento-card rm3-bento-scan">
              <div className="rm3-bento-copy"><FeatureIcon type="scan" /><span>01 · SCAN</span><h3>隨時發起掃描</h3><p>新增需要檢測的網站，即可建立弱點掃描任務，不必自行安裝與維護掃描工具。</p></div>
              <ScanMock />
            </article>
            <article className="rm3-bento-card rm3-bento-schedule">
              <div className="rm3-bento-copy"><FeatureIcon type="schedule" /><span>02 · SCHEDULE</span><h3>自動定期檢測</h3><p>依照網站維運需求設定執行週期，讓弱點掃描自動進行，不再依賴人工記憶。</p></div>
              <ScheduleMock />
            </article>
            <article className="rm3-bento-card rm3-bento-findings">
              <div className="rm3-bento-copy"><FeatureIcon type="finding" /><span>03 · FINDINGS</span><h3>集中查看弱點</h3><p>透過風險等級、OWASP 分類、影響位置與弱點實例，快速理解每一項問題。</p></div>
              <FindingMock />
            </article>
            <article className="rm3-bento-card rm3-bento-report">
              <div className="rm3-bento-copy"><FeatureIcon type="report" /><span>04 · REPORT</span><h3>下載完整報告</h3><p>產出包含風險概況、弱點清單、修復建議與驗證方式的弱掃報告，方便內部存檔與修復溝通。</p></div>
              <BentoReportPreview />
            </article>
          </div>
          <a className="rm3-text-link" href="#report">查看完整產品功能 <Arrow /></a>
        </div>
      </section>

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

      <section className="rm3-values rm3-section" data-nav-surface="light" id="resources" aria-labelledby="rm3-values-title">
        <div className="rm3-shell">
          <div className="rm3-split-heading" data-reveal>
            <div><SectionLabel>BUILT FOR CONTINUOUS SCANNING</SectionLabel><h2 id="rm3-values-title">更常掃描，不必增加<br />同等的維運負擔</h2></div>
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
          <div className="rm3-pricing-actions" data-reveal><a className="primary" href="#start">查看方案與價格 <Arrow /></a><a href="#contact">聯絡我們</a></div>
        </div>
      </section>

      <section className="rm3-final" data-nav-surface="dark" id="start" aria-labelledby="rm3-final-title">
        <div className="rm3-final-image" aria-hidden="true" />
        <div className="rm3-final-grade" aria-hidden="true" />
        <div className="rm3-final-glass" data-reveal>
          <span>START WITH ONE WEBSITE</span>
          <h2 id="rm3-final-title">從第一個網站開始，<br />建立持續弱掃流程</h2>
          <p>以更低的執行成本持續檢測網站弱點，更早發現問題，也讓每一次修復都有清楚的方向。</p>
          <a href="#early-access">立刻開始掃描 <Arrow /></a>
          <small id="early-access"><i /> Redmark 目前開放 Early Access 合作與試用申請。</small>
        </div>
      </section>

      <footer className="rm3-footer" data-nav-surface="dark" id="contact">
        <div className="rm3-footer-main">
          <div className="rm3-footer-brand"><div><span>R</span><strong>redmark</strong></div><p>Redmark 是一套低成本、快速且容易上手的自動化弱點掃描平台，協助企業將低頻的弱點檢測，轉化為可持續執行的日常安全流程。</p></div>
          <div className="rm3-footer-links"><div><span>PRODUCT</span><a href="#platform">產品功能</a><a href="#report">弱掃報告</a><a href="#resources">產品價值</a></div><div><span>COMPANY</span><a href="#pricing">價格方案</a><a href="#start">Early Access</a><a href="#contact">聯絡我們</a></div></div>
        </div>
        <div className="rm3-footer-bottom"><span>© 2026 REDMARK</span><span>VULNERABILITY SCANNING PLATFORM</span></div>
      </footer>
    </div>
  );
}
