"use client";

import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpenModal = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    setActiveModal(type);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  // Structured high-fidelity information for popup cards
  const MODAL_CONTENT: Record<string, { title: string; subtitle: string; icon: string; items: string[]; linkText: string; linkUrl: string }> = {
    kwork: {
      title: "K-Work 외국인 추천 채용정보 요약",
      subtitle: "정부 공식 일자리망 K-Work와 긴밀히 협력해 엄선된 유학생/외국인 우수 맞춤 채용 현황",
      icon: "💼",
      items: [
        "🌐 해외영업 및 다국어 기술지원: 월 280만원 ~ 310만원 선 (전문 기술 비자 E-7 스폰서 매칭 완료)",
        "⚙️ 반도체 기계 정밀가공 제조사: 연봉 3,400만원 상당 (F-2-R 지역 특화 거주비자 5점 우대 가점 매칭)",
        "🏨 글로벌 리조트 및 컨시어지 뷰티/서비스직: 월 250만원 내외 (영어/중국어/베트남어 유학생 우대)",
        "📝 유학생 시간제 근로(D-2 아르바이트): 시급 10,500원 수준 (대학 총장 추천서 일괄 발급 연동)"
      ],
      linkText: "실시간 채용정보 전체보기 ↗",
      linkUrl: "/life"
    },
    visa: {
      title: "외국인 우수인재 비자 가이드 요약",
      subtitle: "국내에 안정적으로 장기 정착하려는 다문화 학우분들을 위한 법무부 출입국 추천 비자 정보",
      icon: "🛡️",
      items: [
        "🎓 D-2 (유학 비자): 정규 대학 학위 이수 목적 체류. 소지 시 주 최대 25~30시간 시간제 근무 가능.",
        "🔎 D-10 (구직 비자): 졸업 후 국내 메이저 기획사 인턴십 및 기업 구직 활동 기회 부여 (최대 2년).",
        "👨‍💻 E-7 (전문인력 비자): 학위 요건 충족 및 정식 연동 고용 계약 체결 시 발급되는 대표 취업 비자.",
        "🏡 F-2-R (지역특화 우수인재 비자): 인구감소 지역 내 장기 거주를 전제로 지자체장이 특혜 발행하는 비자."
      ],
      linkText: "비자 정보 및 자가 계산기 가기 ↗",
      linkUrl: "/life"
    },
    policy: {
      title: "핵심 법무부 외국인 체류/근로 정책 요약",
      subtitle: "외국인 유학생 및 숙련 근로자가 한국 체류 시 필히 인지해야 하는 중요 출입국 상식",
      icon: "⚖️",
      items: [
        "🚨 외국인등록 의무: 한국에 입국한 날부터 반드시 '90일 이내'에 관할 관청에 등록증 신청 필수.",
        "💼 시간제 취업 허가: 유학 비자(D-2) 신분 근로는 대학 및 관할 출입국청 사전 허가 취득 후 개시 가능.",
        "🏡 F-2-R 의무 거주 수칙: 비자 승인 후 추천받은 인구감소 지역 내에서 최소 5년간 실거주 및 정착 필수.",
        "⚖️ 노무 법률 구제: 부당해고 또는 임금 체불 발생 시 대학 멘토단 동행 하에 고용지원부 구제 절차 연동."
      ],
      linkText: "학사공지 및 Q&A 센터 가기 ↗",
      linkUrl: "/learning"
    },
    group: {
      title: "글로벌사이버대 국가별 학생회 현황",
      subtitle: "실시간 생활 정착 정보교류 및 명절 맞춤 오프라인 파티를 개최하는 핫 동문 모임",
      icon: "👥",
      items: [
        "🇻🇳 베트남 동문 모임: 420명 활동 중 (압구정역 근처 방 중개 가이드 지원 및 아시안 식자재 공구 번개)",
        "🇲🇳 몽골 유학생 연합회: 310명 활동 중 (한국 정착 법률 세미나 개최 및 주말 축구/체육 교류 네트워크)",
        "🇳🇵 네팔 교민/학생 소모임: 190명 활동 중 (1:1 전공 튜터링 스터디 매칭 및 추석 단체 문화제 파티)",
        "🇺🇿 우즈베키스탄 친목 모임: 140명 활동 중 (F-2-R 비자 취득 노하우 수기 전파 및 토픽 읽기 스터디)"
      ],
      linkText: "글로벌 커뮤니티 게시판 가기 ↗",
      linkUrl: "/community"
    }
  };

  return (
    <footer className="gcu-footer">
      <div className="gcu-footer-inner">
        <div className="footer-info-col">
          <div className="footer-brand">글로벌사이버대학교</div>
          <p className="footer-desc" style={{ lineHeight: "1.6" }}>
            {t("footerDesc")}
          </p>
        </div>
        
        <div className="footer-links-col">
          <h4>학습/교육</h4>
          <ul className="footer-links">
            <li><a href="/learning">한국어 교육과정</a></li>
            <li><a href="/learning?tab=resources">TOPIK 시험안내</a></li>
            <li><a href="/learning?tab=mocktest">온라인 모의고사</a></li>
            <li><a href="/intro">사업 안내서 다운로드</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>생활/취업</h4>
          <ul className="footer-links">
            <li><a href="/life" onClick={(e) => handleOpenModal(e, "kwork")}>K-Work 채용정보</a></li>
            <li><a href="/life" onClick={(e) => handleOpenModal(e, "visa")}>비자 가이드</a></li>
            <li><a href="/life" onClick={(e) => handleOpenModal(e, "policy")}>외국인 정책</a></li>
            <li><a href="/community" onClick={(e) => handleOpenModal(e, "group")}>국가별 모임</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>고객지원 & 상담</h4>
          <div className="footer-contact-item" style={{ whiteSpace: "nowrap" }}>
            <span className="footer-contact-icon">📞</span>
            <span>학사상담: 02-1234-5678</span>
          </div>
          <div className="footer-contact-item" style={{ whiteSpace: "nowrap" }}>
            <span className="footer-contact-icon">📧</span>
            <span>support@global.ac.kr</span>
          </div>
          <div className="footer-contact-item" style={{ whiteSpace: "nowrap" }}>
            <span className="footer-contact-icon">📍</span>
            <span>서울특별시 강남구 압구정로 32길 11</span>
          </div>
        </div>

        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} GLOBAL CYBER UNIVERSITY. All Rights Reserved. Designed for GCU Global Bridge Initiative.
        </div>
      </div>

      {/* Footer Interactive Modal Popup */}
      {activeModal && MODAL_CONTENT[activeModal] && (
        <div 
          className="drawer-backdrop" 
          onClick={handleCloseModal}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div 
            className="glass-panel" 
            style={{ 
              width: "90%", 
              maxWidth: "540px", 
              padding: "36px", 
              position: "relative", 
              animation: "toastSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              background: "var(--bg-secondary)",
              border: "1px solid var(--gcu-sky)",
              boxShadow: "0 24px 64px rgba(0, 185, 242, 0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseModal} 
              style={{ 
                position: "absolute", 
                right: "20px", 
                top: "20px", 
                background: "transparent", 
                color: "var(--text-secondary)", 
                fontSize: "1.3rem", 
                cursor: "pointer",
                border: "none",
                outline: "none"
              }}
            >
              ✕
            </button>

            {/* Header section with icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "2rem" }}>{MODAL_CONTENT[activeModal].icon}</span>
              <div style={{ textAlign: "left" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--text-primary)", fontFamily: "var(--font-brand)", letterSpacing: "-0.5px" }}>
                  {MODAL_CONTENT[activeModal].title}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--gcu-sky)", marginTop: "4px", fontWeight: "600" }}>
                  글로벌사이버대학교 실시간 정보 연계 서비스
                </p>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5", textAlign: "left", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "14px" }}>
              {MODAL_CONTENT[activeModal].subtitle}
            </p>

            {/* Organized lists */}
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px", padding: 0 }}>
              {MODAL_CONTENT[activeModal].items.map((item, idx) => (
                <li 
                  key={idx} 
                  style={{ 
                    fontSize: "0.82rem", 
                    color: "var(--text-primary)", 
                    lineHeight: "1.6", 
                    textAlign: "left",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.03)",
                    padding: "10px 14px",
                    borderRadius: "8px"
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* Action buttons */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button 
                onClick={handleCloseModal}
                className="btn-secondary"
                style={{ padding: "8px 18px", fontSize: "0.85rem", borderRadius: "8px", cursor: "pointer" }}
              >
                닫기
              </button>
              <a 
                href={MODAL_CONTENT[activeModal].linkUrl}
                className="btn-primary"
                style={{ padding: "8px 20px", fontSize: "0.85rem", borderRadius: "8px", color: "#060A1A", display: "inline-block", textDecoration: "none", cursor: "pointer" }}
                onClick={() => setActiveModal(null)}
              >
                {MODAL_CONTENT[activeModal].linkText}
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
