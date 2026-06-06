"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

// Localized translations for the Login Screen
const LOGIN_TRANSLATIONS = {
  ko: {
    welcomeBack: "당신의 글로벌 꿈\nGCU와 함께 시작하세요",
    loginDesc: "GCU Post School 통합 학사 및 취업 관리 계정 포털에 오신 것을 환영합니다.",
    emailLabel: "이메일 주소",
    emailPlaceholder: "학적 또는 근로 계약용 이메일을 입력하세요...",
    passLabel: "비밀번호",
    passPlaceholder: "비밀번호를 입력하세요...",
    loginBtn: "GCU 계정으로 로그인",
    snsHeader: "또는 공식 연동 SNS 계정으로 로그인",
    googleBtn: "Google 계정으로 로그인",
    appleBtn: "Apple 계정으로 로그인",
    kakaoBtn: "Kakao 계정으로 로그인",
    naverBtn: "Naver 계정으로 로그인",
    validationError: "이메일과 비밀번호를 성실히 기입해 주십시오.",
    testTip: "💡 테스트 관리자 계정: admin@global.ac.kr / 비밀번호: admin123"
  },
  en: {
    welcomeBack: "Start Your Global Dream\nwith GCU",
    loginDesc: "Welcome to GCU Post School integrated academic and employment portal.",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your registered email...",
    passLabel: "Password",
    passPlaceholder: "Enter your password...",
    loginBtn: "Sign in with GCU Account",
    snsHeader: "Or sign in with linked SNS accounts",
    googleBtn: "Sign in with Google",
    appleBtn: "Sign in with Apple",
    kakaoBtn: "Sign in with Kakao",
    naverBtn: "Sign in with Naver",
    validationError: "Please enter a valid email and password.",
    testTip: "💡 Demo Admin Account: admin@global.ac.kr / Password: admin123"
  },
  vn: {
    welcomeBack: "Khởi đầu Ước mơ Toàn cầu\ncùng GCU",
    loginDesc: "Chào mừng đến với cổng quản lý học vụ & việc làm tích hợp GCU Post School.",
    emailLabel: "Địa chỉ Email",
    emailPlaceholder: "Nhập email đăng ký học tập/làm việc...",
    passLabel: "Mật khẩu",
    passPlaceholder: "Nhập mật khẩu của bạn...",
    loginBtn: "Đăng nhập bằng tài khoản GCU",
    snsHeader: "Hoặc đăng nhập bằng liên kết mạng xã hội",
    googleBtn: "Đăng nhập bằng Google",
    appleBtn: "Đăng nhập bằng Apple",
    kakaoBtn: "Đăng nhập bằng Kakao",
    naverBtn: "Đăng nhập bằng Naver",
    validationError: "Vui lòng điền đầy đủ email và mật khẩu.",
    testTip: "💡 Tài khoản Admin thử nghiệm: admin@global.ac.kr / Mật khẩu: admin123"
  },
  mn: {
    welcomeBack: "Глобал мөрөөдлөө\nGCU-тай хамт эхлүүлээрэй",
    loginDesc: "GCU Post School нэгдсэн академик болон ажил эрхлэлтийн удирдлагын системд тавтай морил.",
    emailLabel: "Цахим шуудан",
    emailPlaceholder: "Сургуульд бүртгэлтэй цахим шуудангаа оруулна уу...",
    passLabel: "Нууц үг",
    passPlaceholder: "Нууц үгээ оруулна уу...",
    loginBtn: "GCU хаягаар нэвтрэх",
    snsHeader: "Эсвэл холбосон SNS хаягаар нэвтрэх",
    googleBtn: "Google хаягаар нэвтрэх",
    appleBtn: "Apple хаягаар нэвтрэх",
    kakaoBtn: "Kakao хаягаар нэвтрэх",
    naverBtn: "Naver хаягаар нэвтрэх",
    validationError: "Цахим шуудан болон нууц үгээ оруулна уу.",
    testTip: "💡 Туршилтын Админ хаяг: admin@global.ac.kr / Нууц үг: admin123"
  }
};

export default function LoginPage() {
  const { lang, setLang } = useLanguage();
  const t = LOGIN_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || LOGIN_TRANSLATIONS.ko;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleLoginSuccess = (userObj: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gcu-active-session", JSON.stringify(userObj));
      
      // Auto set language context based on user nationality
      if (userObj.nationality.includes("몽골")) {
        setLang("mn");
      } else if (userObj.nationality.includes("베트남")) {
        setLang("vn");
      } else {
        setLang("en"); // Default for other international users
      }
      
      // Also prepopulate user database in localStorage if empty, to ensure CRUD works instantly
      const savedDb = localStorage.getItem("gcu-users-db");
      if (!savedDb) {
        const defaultUsers = [
          { id: "admin", name: "관리자 (Kim)", email: "admin@global.ac.kr", nationality: "🇰🇷 대한민국", role: "admin", provider: "credentials", joinedDate: "2024-01-10" },
          { id: "google-altan", name: "Altantsetseg", email: "altan@mongol.net", nationality: "🇲🇳 몽골", role: "student", provider: "google", joinedDate: "2025-03-12" },
          { id: "naver-sherzod", name: "Sherzod", email: "sherzod@uzbek.net", nationality: "🇺🇿 우즈베키스탄", role: "graduate", provider: "naver", joinedDate: "2026-02-15" },
          { id: "kakao-rajesh", name: "Rajesh Kumar", email: "rajesh@nepal.org", nationality: "🇳🇵 네팔", role: "worker", provider: "kakao", joinedDate: "2024-08-20" },
          { id: "credentials-thu", name: "Nguyen Thu", email: "thu@vietnam.com", nationality: "🇻🇳 베트남", role: "student", provider: "credentials", joinedDate: "2025-09-01" },
          { id: "apple-thu", name: "Nguyen Thu", email: "thu@vietnam.com", nationality: "🇻🇳 베트남", role: "student", provider: "apple", joinedDate: "2025-09-01" }
        ];
        localStorage.setItem("gcu-users-db", JSON.stringify(defaultUsers));
      }
      
      // Redirect to homepage using browser API to force full header mount sync
      window.location.href = "/";
    }
  };

  const handleTraditionalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage(t.validationError);
      return;
    }

    setLoadingProvider("credentials");

    setTimeout(() => {
      setLoadingProvider(null);
      
      // Admin account check
      if (email.trim() === "admin@global.ac.kr" && password.trim() === "admin123") {
        handleLoginSuccess({
          id: "admin",
          name: "관리자 (Kim)",
          email: "admin@global.ac.kr",
          nationality: "🇰🇷 대한민국",
          role: "admin",
          provider: "credentials"
        });
      } else {
        // Mock standard credentials user
        handleLoginSuccess({
          id: "credentials-" + Date.now(),
          name: email.split("@")[0],
          email: email.trim(),
          nationality: "🇻🇳 베트남",
          role: "student",
          provider: "credentials"
        });
      }
    }, 1000);
  };

  const handleSnsLogin = (provider: "google" | "kakao" | "naver" | "apple") => {
    setErrorMessage("");
    setLoadingProvider(provider);

    setTimeout(() => {
      setLoadingProvider(null);

      // Predefined mock users based on clicked provider
      if (provider === "google") {
        handleLoginSuccess({
          id: "google-altan",
          name: "Altantsetseg",
          email: "altan@mongol.net",
          nationality: "🇲🇳 몽골",
          role: "student",
          provider: "google"
        });
      } else if (provider === "kakao") {
        handleLoginSuccess({
          id: "kakao-rajesh",
          name: "Rajesh Kumar",
          email: "rajesh@nepal.org",
          nationality: "🇳🇵 네팔",
          role: "worker",
          provider: "kakao"
        });
      } else if (provider === "naver") {
        handleLoginSuccess({
          id: "naver-sherzod",
          name: "Sherzod",
          email: "sherzod@uzbek.net",
          nationality: "🇺🇿 우즈베키스탄",
          role: "graduate",
          provider: "naver"
        });
      } else if (provider === "apple") {
        handleLoginSuccess({
          id: "apple-thu",
          name: "Nguyen Thu",
          email: "thu@vietnam.com",
          nationality: "🇻🇳 베트남",
          role: "student",
          provider: "apple"
        });
      }
    }, 1200);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 0" }}>
      <div 
        className="glass-panel" 
        style={{ 
          width: "100%", 
          maxWidth: "480px", 
          padding: "40px", 
          textAlign: "center",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-lg)"
        }}
      >
        {/* Symbol */}
        <img 
          src="/gcu-university-logo.png" 
          alt="Global Cyber University Logo" 
          style={{ 
            width: "100%", 
            maxWidth: "240px", 
            height: "auto", 
            objectFit: "contain",
            margin: "0 auto 24px auto",
            display: "block"
          }} 
        />

        <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--text-primary)", fontFamily: "var(--font-brand)", letterSpacing: "-0.5px", marginBottom: "12px", whiteSpace: "pre-line", lineHeight: "1.35" }}>
          {t.welcomeBack}
        </h1>
        
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "32px" }}>
          {t.loginDesc}
        </p>

        {/* Traditional Form */}
        <form onSubmit={handleTraditionalLogin} style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
          <div>
            <label className="calc-label" style={{ display: "block", marginBottom: "8px" }}>
              {t.emailLabel}
            </label>
            <input 
              type="email" 
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="search-input"
              style={{ padding: "12px 16px", height: "46px" }}
              required
              disabled={loadingProvider !== null}
            />
          </div>

          <div>
            <label className="calc-label" style={{ display: "block", marginBottom: "8px" }}>
              {t.passLabel}
            </label>
            <input 
              type="password" 
              placeholder={t.passPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="search-input"
              style={{ padding: "12px 16px", height: "46px" }}
              required
              disabled={loadingProvider !== null}
            />
          </div>

          {errorMessage && (
            <div style={{ color: "var(--gcu-orange)", fontSize: "0.8rem", fontWeight: "600" }}>
              ⚠️ {errorMessage}
            </div>
          )}

          <button 
            type="submit" 
            className="sim-start-btn" 
            style={{ 
              height: "46px", 
              fontSize: "0.95rem", 
              fontWeight: "700", 
              marginTop: "8px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              gap: "8px"
            }}
            disabled={loadingProvider !== null}
          >
            {loadingProvider === "credentials" ? "🔐 Connecting..." : t.loginBtn}
          </button>
        </form>

        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "12px", textAlign: "left" }}>
          {t.testTip}
        </div>

        {/* Separator line */}
        <div style={{ display: "flex", alignItems: "center", margin: "32px 0 24px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }}></div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", padding: "0 12px" }}>{t.snsHeader}</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }}></div>
        </div>

        {/* SNS buttons grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          
          {/* Google Button */}
          <button 
            onClick={() => handleSnsLogin("google")}
            disabled={loadingProvider !== null}
            style={{ 
              height: "44px", 
              borderRadius: "8px", 
              border: "1px solid rgba(0, 0, 0, 0.08)", 
              background: "#ffffff", 
              color: "var(--text-primary)", 
              fontSize: "0.85rem", 
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "all 0.25s ease",
              width: "100%",
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#f8f9fa"}
            onMouseOut={(e) => e.currentTarget.style.background = "#ffffff"}
          >
            <span style={{ 
              fontSize: "0.8rem", 
              fontWeight: "900", 
              background: "#4285F4", 
              color: "#ffffff", 
              width: "20px", 
              height: "20px", 
              borderRadius: "4px", 
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontFamily: "var(--font-brand)"
            }}>G</span>
            <span>{loadingProvider === "google" ? "Syncing..." : t.googleBtn}</span>
          </button>

          {/* Apple Button */}
          <button 
            onClick={() => handleSnsLogin("apple")}
            disabled={loadingProvider !== null}
            style={{ 
              height: "44px", 
              borderRadius: "8px", 
              border: "none", 
              background: "#000000", 
              color: "#ffffff", 
              fontSize: "0.85rem", 
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "all 0.25s ease",
              width: "100%",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#1a1a1a"}
            onMouseOut={(e) => e.currentTarget.style.background = "#000000"}
          >
            <span style={{ fontSize: "1.15rem", fontWeight: "700" }}></span>
            <span>{loadingProvider === "apple" ? "Verifying..." : t.appleBtn}</span>
          </button>

          {/* Kakao Button */}
          <button 
            onClick={() => handleSnsLogin("kakao")}
            disabled={loadingProvider !== null}
            style={{ 
              height: "44px", 
              borderRadius: "8px", 
              border: "none", 
              background: "#FEE500", 
              color: "#191919", 
              fontSize: "0.85rem", 
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "all 0.25s ease",
              width: "100%"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#FAD800"}
            onMouseOut={(e) => e.currentTarget.style.background = "#FEE500"}
          >
            <span style={{ fontSize: "1.2rem" }}>💬</span>
            <span>{loadingProvider === "kakao" ? "Connecting..." : t.kakaoBtn}</span>
          </button>

          {/* Naver Button */}
          <button 
            onClick={() => handleSnsLogin("naver")}
            disabled={loadingProvider !== null}
            style={{ 
              height: "44px", 
              borderRadius: "8px", 
              border: "none", 
              background: "#03C75A", 
              color: "#ffffff", 
              fontSize: "0.85rem", 
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "all 0.25s ease",
              width: "100%"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#02B34E"}
            onMouseOut={(e) => e.currentTarget.style.background = "#03C75A"}
          >
            <span style={{ 
              fontSize: "0.8rem", 
              fontWeight: "900", 
              background: "#ffffff", 
              color: "#03C75A", 
              width: "20px", 
              height: "20px", 
              borderRadius: "4px", 
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontFamily: "var(--font-brand)"
            }}>N</span>
            <span>{loadingProvider === "naver" ? "Linking..." : t.naverBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
