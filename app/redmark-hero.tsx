"use client";

/* eslint-disable @next/next/no-img-element -- The approved composition relies on raw image sizing and CSS cropping. */

import Link from "next/link";
import { useEffect, useRef } from "react";

const ArrowUpRight = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
    <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
  </svg>
);

const ChevronDown = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 16 16">
    <path d="m5 6.5 3 3 3-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
  </svg>
);

const LogoMark = () => (
  <svg aria-hidden="true" className="logo-mark" fill="none" viewBox="0 0 34 34">
    <circle cx="17" cy="17" r="10.75" stroke="currentColor" strokeWidth="2" />
    <path d="M17 6.25a10.75 10.75 0 0 1 9.31 5.38" stroke="#f04424" strokeLinecap="round" strokeWidth="2.6" />
    <path d="M23.5 11.5 27 11l-.25 3.5" stroke="#f04424" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    <circle cx="17" cy="17" r="2.4" fill="#f04424" />
    <path d="M17 14.6V9" stroke="#f04424" strokeLinecap="round" strokeWidth="1.6" />
  </svg>
);

export default function RedmarkHero({ children }: { children: React.ReactNode }) {
  const heroRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const scrollRoot = scrollRef.current;
    if (!hero || !scrollRoot) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia("(max-width: 760px), (max-height: 700px)");
    let frame = 0;

    const setShifts = (scrolled: number) => {
      hero.style.setProperty("--hero-background-y", `${(scrolled * 0.171).toFixed(2)}px`);
      hero.style.setProperty("--hero-dashboard-y", `${(scrolled * 0.128).toFixed(2)}px`);
      hero.style.setProperty("--hero-copy-y", `${(scrolled * 0.064).toFixed(2)}px`);
    };

    const update = () => {
      frame = 0;
      if (reducedMotion.matches || compactViewport.matches) {
        setShifts(0);
        return;
      }

      const bounds = scrollRoot.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-bounds.top, 0), bounds.height);
      setShifts(scrolled);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    compactViewport.addEventListener("change", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      compactViewport.removeEventListener("change", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const lightSections = Array.from(
      shell.querySelectorAll<HTMLElement>("[data-nav-surface='light']"),
    );
    let frame = 0;

    const updateNavTheme = () => {
      frame = 0;
      const probeY = 36;
      const isOverLightSection = lightSections.some((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= probeY && bounds.bottom > probeY;
      });
      shell.dataset.navTheme = isOverLightSection ? "light" : "dark";
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNavTheme);
    };

    updateNavTheme();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      delete shell.dataset.navTheme;
    };
  }, []);

  return (
    <main className="site-shell monumental-variant reference-tuned bento-redesign" ref={shellRef}>
      <header className="topbar">
        <Link aria-label="Redmark 首頁" className="brand" href="/">
          <LogoMark />
          <span>redmark</span>
        </Link>

        <nav aria-label="主要導覽" className="desktop-nav">
          <a href="#platform">產品功能 <ChevronDown /></a>
          <a href="#solutions">解決方案</a>
          <a href="#resources">資安資源</a>
          <a href="#pricing">價格方案</a>
        </nav>

        <div className="nav-actions">
          <a className="login-link" href="#start">登入</a>
          <a className="nav-cta" href="#contact">預約展示 <ArrowUpRight /></a>
        </div>

        <button aria-label="開啟選單" className="menu-button" type="button">
          <span />
          <span />
        </button>
      </header>

      <div className="hero-scroll" ref={scrollRef}>
        <section className="hero hero-parallax" aria-labelledby="hero-title" ref={heroRef}>
          <div className="mountain-layer mountain-background" aria-hidden="true">
            <img alt="" decoding="async" fetchPriority="high" src="/mountain-background.jpg" />
          </div>
          <div className="hero-color-grade" aria-hidden="true" />
          <div className="hero-left-shade" aria-hidden="true" />

          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow"><span /> VULNERABILITY SCANNING PLATFORM</p>
              <h1 id="hero-title">看得更遠，<span>更早發現風險。</span></h1>
              <p className="hero-description">
                立即或定期掃描網站弱點，集中查看風險等級、弱點證據與修復建議。
                <br className="desktop-break" />
                Redmark 讓團隊不必自行部署與維護複雜工具，也能持續執行安全檢測。
              </p>
              <div className="hero-actions">
                <a className="primary-cta" href="#start">立即開始掃描 <ArrowUpRight /></a>
              </div>
            </div>

            <div className="product-stage" aria-label="Redmark 弱點掃描平台介面預覽">
              <div className="product-window">
                <div className="window-bar">
                  <div className="window-controls" aria-hidden="true"><span /><span /><span /></div>
                  <span className="window-title">Redmark Security Console · Real UI</span>
                  <span className="window-status"><i /> Live</span>
                </div>
                <div className="dashboard-viewport">
                  <img
                    alt="Redmark 英文版資產弱點掃描詳情，包含風險分級與弱點列表"
                    decoding="async"
                    src="/redmark-dashboard-en-real.png"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-atmosphere" aria-hidden="true" />
        </section>
      </div>

      <div className="hero-follow-through">{children}</div>
    </main>
  );
}
