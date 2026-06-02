"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Lang } from "../translations";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [activeUser, setActiveUser] = useState<any>(null);

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
              mixBlendMode: "screen",
              borderRadius: "50%",
              boxShadow: "0 0 12px rgba(0, 185, 242, 0.4)"
            }} 
          />
          <div className="gcu-logo-text" style={{ whiteSpace: "nowrap" }}>GCU Global Bridge</div>
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
                border: "1px solid var(--gcu-sky)", 
                background: "rgba(0, 185, 242, 0.05)",
                color: "var(--gcu-sky)",
                fontWeight: "600"
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
                  color: "var(--gcu-sky)", 
                  background: "rgba(255,255,255,0.03)", 
                  padding: "5px 10px", 
                  borderRadius: "20px", 
                  border: "1px solid var(--border-color)",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  textDecoration: "none",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
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
                  background: "rgba(247,147,30,0.12)", 
                  border: "1px solid var(--gcu-orange)", 
                  color: "var(--gcu-orange)", 
                  padding: "5px 10px", 
                  cursor: "pointer", 
                  borderRadius: "8px", 
                  fontSize: "0.78rem", 
                  fontWeight: "700",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(247,147,30,0.2)"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(247,147,30,0.12)"}
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
        </div>
      </div>
    </header>
  );
}
