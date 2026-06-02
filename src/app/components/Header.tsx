"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Lang } from "../translations";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [activeUser, setActiveUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("gcu-active-session");
      if (session) {
        try {
          setActiveUser(JSON.parse(session));
        } catch (e) {
          console.error("Failed to parse active user session:", e);
        }
      }
    }
  }, []);

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as Lang);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("gcu-active-session");
      // Force reload to completely wipe session state and reset layout mount states
      window.location.href = "/";
    }
  };

  return (
    <header className="gcu-header">
      <div className="gcu-header-inner">
        {/* Logo Brand Group */}
        <a href="/" className="gcu-logo-group">
          <img 
            src="/gcu-logo.png" 
            alt="GCU Logo" 
            style={{ 
              width: "30px", 
              height: "30px", 
              objectFit: "contain", 
              borderRadius: "50%",
              boxShadow: "0 0 12px rgba(0, 185, 242, 0.4)"
            }} 
          />
          <div className="gcu-logo-text" style={{ whiteSpace: "nowrap" }}>GCU Post School</div>
        </a>

        {/* Navigation Menu */}
        <nav className="gcu-nav" style={{ flexWrap: "nowrap", alignItems: "center" }}>
          <a href="/intro" className="gcu-nav-item" style={{ whiteSpace: "nowrap" }}>{t("navIntro")}</a>
          <a href="/learning" className="gcu-nav-item" style={{ whiteSpace: "nowrap" }}>{t("navLearning")}</a>
          <a href="/life" className="gcu-nav-item" style={{ whiteSpace: "nowrap" }}>{t("navLife")}</a>
          <a href="/community" className="gcu-nav-item" style={{ whiteSpace: "nowrap" }}>{t("navCommunity")}</a>
          <a href="/qna" className="gcu-nav-item" style={{ whiteSpace: "nowrap" }}>{t("navQna")}</a>
          {activeUser && (
            <a 
              href="/profile" 
              className="gcu-nav-item" 
              style={{ 
                whiteSpace: "nowrap", 
                color: "var(--gcu-green)", 
                fontWeight: "600" 
              }}
            >
              👤 {lang === "ko" ? "마이페이지" : "My Page"}
            </a>
          )}
          {activeUser?.role === "admin" && (
            <a 
              href="/admin" 
              className="gcu-nav-item" 
              style={{ 
                whiteSpace: "nowrap", 
                border: "1px solid rgba(18, 42, 77, 0.15)", 
                background: "rgba(18, 42, 77, 0.03)",
                color: "var(--gcu-navy)",
                fontWeight: "600",
                borderRadius: "8px",
                padding: "3px 8px"
              }}
            >
              🔑 {t("navAdmin")}
            </a>
          )}
        </nav>

        {/* Action Panels */}
        <div className="gcu-header-actions" style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Language Picker */}
          <select 
            className="lang-selector" 
            aria-label="Language Selector" 
            value={lang}
            onChange={handleLangChange}
            style={{ cursor: "pointer", outline: "none" }}
          >
            <option value="ko">한국어 (KO)</option>
            <option value="en">English (EN)</option>
            <option value="vn">Tiếng Việt (VN)</option>
            <option value="mn">Монгол (MN)</option>
          </select>

          {/* Quick Mock Exam link */}
          <a 
            href="/learning?tab=mocktest" 
            className="btn-header-cta"
            style={{ whiteSpace: "nowrap", flexShrink: 0, padding: "5px 10px", fontSize: "0.78rem" }}
          >
            {t("navMocktest")}
          </a>

          {/* Active Session User Badge & Auth trigger */}
          {activeUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
              <a 
                href="/profile"
                style={{ 
                  fontSize: "0.75rem", 
                  fontWeight: "700", 
                  color: "var(--gcu-navy)", 
                  background: "rgba(18, 42, 77, 0.03)", 
                  padding: "5px 10px", 
                  borderRadius: "20px", 
                  border: "1px solid rgba(18, 42, 77, 0.15)",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  textDecoration: "none",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(18, 42, 77, 0.08)"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(18, 42, 77, 0.03)"}
              >
                <span>👤</span>
                <span>{activeUser.name}</span>
                <span style={{ fontSize: "0.85rem" }}>{activeUser.nationality.split(" ")[0]}</span>
              </a>
              
              <button 
                onClick={handleLogout}
                style={{ 
                  whiteSpace: "nowrap", 
                  flexShrink: 0, 
                  background: "rgba(0, 0, 0, 0.03)", 
                  border: "1px solid rgba(0, 0, 0, 0.12)", 
                  color: "var(--text-secondary)", 
                  padding: "5px 10px", 
                  cursor: "pointer", 
                  borderRadius: "8px", 
                  fontSize: "0.78rem", 
                  fontWeight: "700",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(0, 0, 0, 0.08)"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(0, 0, 0, 0.03)"}
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <a 
              href="/login" 
              style={{ 
                whiteSpace: "nowrap", 
                flexShrink: 0, 
                background: "var(--brand-gradient)", 
                border: "1px solid var(--gcu-sky)", 
                color: "#fff", 
                padding: "5px 10px", 
                borderRadius: "8px", 
                fontSize: "0.78rem", 
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                boxShadow: "var(--shadow-glow)"
              }}
            >
              <span>🔑</span>
              <span>{t("login")}</span>
            </a>
          )}

          {/* Mobile Hamburger Menu Toggle Button */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{ display: "flex", marginLeft: "4px" }}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Overlay Navigation Menu */}
      {isMenuOpen && (
        <div className="gcu-mobile-menu" style={{ display: "flex" }}>
          <div className="gcu-mobile-menu-nav">
            <a href="/intro" className="gcu-mobile-nav-item" onClick={() => setIsMenuOpen(false)}>{t("navIntro")}</a>
            <a href="/learning" className="gcu-mobile-nav-item" onClick={() => setIsMenuOpen(false)}>{t("navLearning")}</a>
            <a href="/life" className="gcu-mobile-nav-item" onClick={() => setIsMenuOpen(false)}>{t("navLife")}</a>
            <a href="/community" className="gcu-mobile-nav-item" onClick={() => setIsMenuOpen(false)}>{t("navCommunity")}</a>
            <a href="/qna" className="gcu-mobile-nav-item" onClick={() => setIsMenuOpen(false)}>{t("navQna")}</a>
            {activeUser && (
              <a 
                href="/profile" 
                className="gcu-mobile-nav-item" 
                style={{ color: "var(--gcu-green)", fontWeight: "600" }}
                onClick={() => setIsMenuOpen(false)}
              >
                👤 {lang === "ko" ? "마이페이지" : "My Page"}
              </a>
            )}
            {activeUser?.role === "admin" && (
              <a 
                href="/admin" 
                className="gcu-mobile-nav-item" 
                style={{ color: "var(--gcu-sky)", fontWeight: "600" }}
                onClick={() => setIsMenuOpen(false)}
              >
                🔑 {t("navAdmin")}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

