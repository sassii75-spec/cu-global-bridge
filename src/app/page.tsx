"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./context/LanguageContext";

// NOTICE_ITEMS with full multilingual translations
const NOTICE_ITEMS = [
  {
    id: 1,
    category: "notice",
    title: {
      ko: "[공지] 2026학년도 2학기 외국인 장학금 신청 안내",
      en: "[Notice] 2026 Fall Semester Scholarship Application for International Students",
      vn: "[Thông báo] Hướng dẫn đăng ký học bổng cho người nước ngoài kỳ 2 năm 2026",
      mn: "[Зар] 2026 оны 2-р улирлын гадаад оюутны тэтгэлэг хүсэх заавар"
    },
    date: "2026-06-01"
  },
  {
    id: 2,
    category: "notice",
    title: {
      ko: "[학사] 제68회 TOPIK 단체 접수 및 특별 대비반 개설",
      en: "[Academics] 68th TOPIK Group Registration & Special Prep Class Opening",
      vn: "[Học vụ] Đăng ký TOPIK tập thể lần thứ 68 & Khai giảng lớp ôn tập đặc biệt",
      mn: "[Сургууль] 68 дахь TOPIK нэгдсэн бүртгэл ба Бэлтгэл ангийн нээлт"
    },
    date: "2026-05-28"
  },
  {
    id: 3,
    category: "event",
    title: {
      ko: "[행사] 글로벌사이버대 제3회 세계시민 문화 페스티벌 개최",
      en: "[Event] Global Cyber University 3rd Global Citizen Culture Festival",
      vn: "[Sự kiện] Tổ chức Lễ hội Văn hóa Công dân Toàn cầu lần thứ 3 ĐH Global Cyber",
      mn: "[Арга хэмжээ] Глобал Сайбер Их Сургуулийн 3 дахь Дэлхийн иргэдийн соёлын наадам"
    },
    date: "2026-05-24"
  },
  {
    id: 4,
    category: "guide",
    title: {
      ko: "[안내] 외국인 유학생을 위한 주거 계약 및 임대차 사기 예방 특강",
      en: "[Guide] Special Lecture on Housing Contracts & Rental Fraud Prevention for Intl Students",
      vn: "[Hướng dẫn] Bài giảng phòng chống lừa đảo thuê nhà & hợp đồng nhà ở cho du học sinh",
      mn: "[Заавар] Гадаад оюутнуудад зориулсан байрны гэрээ ба түрээсийн луйвраас сэргийлэх лекц"
    },
    date: "2026-05-20"
  },
  {
    id: 5,
    category: "guide",
    title: {
      ko: "[취업] D-10 구직비자 전환 필수 교육 이수 일정 안내",
      en: "[Jobs] D-10 Job Seeking Visa Conversion Mandatory Training Schedule Info",
      vn: "[Việc làm] Thông báo lịch đào tạo bắt buộc để chuyển đổi sang Visa tìm việc D-10",
      mn: "[Ажил] D-10 виз рүү шилжихэд шаардлагатай албан ёсны сургалтын хуваарь"
    },
    date: "2026-05-18"
  }
];

const PARTNERS = [
  {
    name: {
      ko: "고용노동부 K-Work",
      en: "Ministry of Employment K-Work",
      vn: "Bộ Lao động K-Work",
      mn: "Хөдөлмөр, халамжийн үйлчилгээний K-Work"
    },
    url: "https://k-work.or.kr/",
    description: {
      ko: "정부 공식 고용 정보망 연동 및 외국인 맞춤형 일자리 찾기 지원",
      en: "Official government job network integration and customized vacancy search",
      vn: "Kết nối mạng thông tin tuyển dụng chính thức của chính phủ và hỗ trợ tìm việc làm",
      mn: "Засгийн газрын албан ёсны ажлын байрны сүлжээ ба гадаад иргэдэд зориулсан хайлт"
    },
    icon: "💼",
    color: "var(--gcu-sky)"
  },
  {
    name: {
      ko: "법무부 출입국·외국인정책본부",
      en: "Korea Immigration Service",
      vn: "Cục Quản lý Xuất nhập cảnh Bộ Tư pháp",
      mn: "Хууль зүйн яамны Шилжилт хөдөлгөөний алба"
    },
    url: "https://www.immigration.go.kr/",
    description: {
      ko: "국내 체류 외국인 비자 심사, 출입국 규정 및 정책 정보 가이드",
      en: "Residency visa screening, entry rules, and policy guidelines for foreigners",
      vn: "Thẩm định visa, quy định xuất nhập cảnh và hướng dẫn chính sách cho người nước ngoài",
      mn: "Гадаад иргэдийн визний хяналт, хилээр нэвтрэх журам, бодлогын зааварчилгаа"
    },
    icon: "⚖️",
    color: "var(--gcu-blue)"
  },
  {
    name: {
      ko: "한국산업인력공단",
      en: "Human Resources Development Service of Korea",
      vn: "Cơ quan Phát triển Nguồn nhân lực Hàn Quốc (HRDK)",
      mn: "БНСУ-ын Хүний нөөцийн хөгжлийн хэрэгжүүлэгч агентлаг"
    },
    url: "https://www.hrdkorea.or.kr/",
    description: {
      ko: "국가 직무 능력 표준 평가 및 외국인 숙련 기능 인력 자격 검정",
      en: "National competency standards evaluation and foreign skilled labor licensing",
      vn: "Đánh giá tiêu chuẩn năng lực nghề nghiệp quốc gia & sát hạch tay nghề người nước ngoài",
      mn: "Үндэсний мэргэжлийн ур чадварын үнэлгээ ба гадаад ур чадвартай ажилчдын шалгалт"
    },
    icon: "🏫",
    color: "var(--gcu-green)"
  },
  {
    name: {
      ko: "다문화종합정착지원포털 다누리",
      en: "Danuri Multicultural Portal",
      vn: "Cổng hỗ trợ định cư đa văn hóa Danuri",
      mn: "Олон соёлт гэр бүлийг дэมжих Данури портал"
    },
    url: "https://www.liveinkorea.kr/",
    description: {
      ko: "전국 다문화 가족 정착 정보 및 13개국어 종합 상담 전화 콜센터",
      en: "Settlement guides for multicultural families and 13-language helpdesk helpline",
      vn: "Thông tin định cư cho gia đình đa văn hóa toàn quốc & tổng đài tư vấn 13 ngôn ngữ",
      mn: "Гэр бүлийн суурьших зааварчилгаа ба 13 хэлний зөвлөгөө өгөх утасны төв"
    },
    icon: "🏠",
    color: "var(--gcu-orange)"
  },
  {
    name: {
      ko: "하이코리아 (Hi Korea)",
      en: "Hi Korea (Government for Foreigners)",
      vn: "Hi Korea (Cổng thông tin điện tử cho người nước ngoài)",
      mn: "Хайкориа (Гадаад иргэдэд зориулсан цахим засгийн газар)"
    },
    url: "https://www.hikorea.go.kr/",
    description: {
      ko: "외국인을 위한 전자정부 민원 신청, 비자 연장 및 예약 서비스",
      en: "E-government civil applications, visa extensions, and reservation services",
      vn: "Nộp hồ sơ hành chính trực tuyến, gia hạn visa và dịch vụ đặt lịch hẹn trước",
      mn: "Гадаад иргэдэд зориулсан цахим өргөдөл, виз сунгалт, цаг авах үйлчилгээ"
    },
    icon: "🌐",
    color: "var(--gcu-yellow)"
  }
];

const HOME_TRANSLATIONS: Record<"ko" | "en" | "vn" | "mn", {
  quickLinksTitle: string;
  widgetTitle: string;
  widgetDesc: string;
  widgetBtn: string;
  syncSuccessToast: string;
  syncAlreadyToast: string;
  tagNotice: string;
  tagEvent: string;
  tagGuide: string;
  syncBannerText: string;
  partnerTitle: string;
  partnerDesc: string;
  confirmPrefix: string;
  confirmSuffix: string;
}> = {
  ko: {
    quickLinksTitle: "핵심 지원 서비스 바로가기",
    widgetTitle: "실시간 TOPIK 모의고사 출시",
    widgetDesc: "듣기 및 읽기 영역으로 구성된 맞춤형 한국어 능력시험 모의고사를 풀고, 즉시 채점 점수와 고득점을 위한 정답 해설을 받아보세요. 로그인 없이 무제한 응시 가능합니다.",
    widgetBtn: "모의고사 응시하기",
    syncSuccessToast: "📡 K-Work 및 법무부 출입국 포털에서 최신 정책공지 2건과 일자리 채용 1건이 성공적으로 실시간 동기화되었습니다!",
    syncAlreadyToast: "🔄 이미 최신 유관 정부기관 공지사항이 동기화되어 실시간 반영 중입니다.",
    tagNotice: "공지",
    tagEvent: "행사",
    tagGuide: "안내",
    syncBannerText: "📡 [실시간 연동 활성] 하이코리아(Hi Korea) 민원 창구 및 고용노동부 K-Work 일자리 연계망과 실시간 연동되어 공인 갱신 공지가 연계 제공 중입니다.",
    partnerTitle: "🌐 협력 파트너 및 유관 행정 기관",
    partnerDesc: "글로벌사이버대학교는 유관 행정부처, 외국인 복지 정책실, 고용지원센터 및 다문화 정착 협회들과 유기적으로 네트워킹하여 유학생들의 행정업무와 실질적 삶의 정착을 전면 견인합니다. 각 로고를 선택하시면 공식 포털로 안전하게 이동합니다.",
    confirmPrefix: "정부 공식 파트너 협력 기관인 [",
    confirmSuffix: "] 홈페이지로 안전하게 연결됩니다. 이동하시겠습니까?"
  },
  en: {
    quickLinksTitle: "Quick Support Services Shortcuts",
    widgetTitle: "Real-time TOPIK Mock Exam Released",
    widgetDesc: "Take custom TOPIK practice exams with listening and reading sections. Get instant grading and detailed answer keys for higher scores. Unlimited attempts available without login.",
    widgetBtn: "Take Mock Exam",
    syncSuccessToast: "📡 2 latest policy notices and 1 job posting have been successfully synchronized from K-Work and Immigration portals in real time!",
    syncAlreadyToast: "🔄 Latest government notices are already synchronized and reflected in real time.",
    tagNotice: "Notice",
    tagEvent: "Event",
    tagGuide: "Guide",
    syncBannerText: "📡 [Live Sync Active] Real-time integration active with Hi Korea public services and Ministry of Employment K-Work database.",
    partnerTitle: "🌐 Cooperation Partners & Administrative Authorities",
    partnerDesc: "Global Cyber University works closely with administrative ministries, foreign welfare divisions, job centers, and multicultural settlement associations to guide student paperwork and integration. Click any card to navigate securely.",
    confirmPrefix: "You will be redirected securely to the official [",
    confirmSuffix: "] website. Would you like to proceed?"
  },
  vn: {
    quickLinksTitle: "Truy cập nhanh Dịch vụ Hỗ trợ",
    widgetTitle: "Ra mắt Đề thi thử TOPIK trực tuyến",
    widgetDesc: "Làm bài thi thử TOPIK bao gồm cả kỹ năng nghe và đọc. Nhận điểm ngay lập tục cùng đáp án chi tiết giải thích cho điểm số cao hơn. Làm bài không giới hạn và không cần đăng nhập.",
    widgetBtn: "Thi thử ngay",
    syncSuccessToast: "📡 2 thông báo chính sách mới nhất và 1 tin tuyển dụng đã được đồng bộ hóa thành công từ K-Work và Xuất nhập cảnh theo thời gian thực!",
    syncAlreadyToast: "🔄 Các thông báo chính thức của chính phủ đã được đồng bộ hóa và phản ánh theo thời gian thực.",
    tagNotice: "Thông báo",
    tagEvent: "Sự kiện",
    tagGuide: "Hướng dẫn",
    syncBannerText: "📡 [Kết nối Trực tiếp] Hệ thống đang liên thông thời gian thực với dịch vụ hành chính Hi Korea và mạng lưới tuyển dụng K-Work.",
    partnerTitle: "🌐 Đối tác Liên kết & Cơ quan Hành chính liên quan",
    partnerDesc: "Đại học Global Cyber xây dựng mạng lưới liên kết chặt chẽ với các bộ ngành chính phủ, văn phòng chính sách phúc lợi người nước ngoài, trung tâm dịch vụ việc làm để hỗ trợ tối đa các thủ tục hành chính. Nhấp vào các logo để chuyển hướng an toàn.",
    confirmPrefix: "Hệ thống sẽ chuyển hướng bạn đến trang web chính thức của [",
    confirmSuffix: "]. Bạn có muốn tiếp tục không?"
  },
  mn: {
    quickLinksTitle: "Үндсэн дэмжлэг үйлчилгээ",
    widgetTitle: "TOPIK загвар шалгалт нээгдлээ",
    widgetDesc: "Сонсох болон унших хэсгээс бүрдсэн солонгос хэлний түвшин тогтоох шалгалтыг өгч, оноогоо шууд харан зөвлөмж аваарай. Бүртгэлгүйгээр хязгааргүй өгөх боломжтой.",
    widgetBtn: "Шалгалт өгөх",
    syncSuccessToast: "📡 K-Work болон Шилжилт хөдөлгөөний порталаас 2 шинэ бодлогын мэдээ, 1 ажлын байрны мэдээ бодит цагт амжилттай холбогдлоо!",
    syncAlreadyToast: "🔄 Засгийн газрын сүүлийн үеийн мэдээллүүд холбогдсон бөгөөд бодит цагт шинэчлэгдэж байна.",
    tagNotice: "Зар",
    tagEvent: "Арга хэмжээ",
    tagGuide: "Зааварчилгаа",
    syncBannerText: "📡 [Бодит цагийн холболт] Хайкориа төрийн үйлчилгээ болон Хөдөлмөрийн яамны K-Work мэдээллийн сантай бодит цагт амжилттай холбогдов.",
    partnerTitle: "🌐 Хамтран ажиллагч байгууллага, захиргааны албад",
    partnerDesc: "Глобал Сайбер Их Сургууль нь холбогдох яамд, гадаад иргэдийн халамжийн алба, хөдөлмөр эрхлэлтийг дэмжих төв болон олон соёлт холбоодтой хамтран ажиллаж, оюутнуудын захиргааны ажил болон суурьшилтыг дэмжинэ. Зургуудыг сонгон холбогдох портал руу нэвтэрнэ үү.",
    confirmPrefix: "Засгийн газрын албан ёсны түнш болох [",
    confirmSuffix: "] вэбсайт руу аюулгүй шилжиж байна. Үргэлжлүүлэх үү?"
  }
};

export default function Home() {
  const { lang, t } = useLanguage();
  const tHome = HOME_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || HOME_TRANSLATIONS.ko;

  const [activeFeedTab, setActiveFeedTab] = useState("all");
  const [feedItems, setFeedItems] = useState<any[]>(NOTICE_ITEMS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [syncedCount, setSyncedCount] = useState(0);

  const handleSyncPortals = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    
    // Simulate real-time API latency
    setTimeout(() => {
      setIsSyncing(false);
      
      if (syncedCount >= 1) {
        setToast(tHome.syncAlreadyToast);
        return;
      }

      // Synced official policies with multilingual translation maps
      const syncedFeeds = [
        {
          id: 101,
          category: "gov",
          title: {
            ko: "⚖️ 법무부 출입국: [정책] 2026년 하반기 지역특화형 우수인재(F-2-R) 거주비자 쿼터 긴급 추가 배정안 발표",
            en: "⚖️ Ministry of Justice Immigration: [Policy] Announcement of Urgent F-2-R Residency Visa Quota Allocation for H2 2026",
            vn: "⚖️ Cục QLXNC Bộ Tư pháp: [Chính sách] Công bố bổ sung khẩn cấp hạn ngạch visa cư trú F-2-R nửa cuối 2026",
            mn: "⚖️ Хууль зүйн яам: [Бодлого] 2026 оны сүүл хагасын F-2-R визний нэмэлт квот олгох шийдвэр"
          },
          date: "실시간 연동"
        },
        {
          id: 102,
          category: "gov",
          title: {
            ko: "💼 고용노동부 K-Work: [일자리] 시화공단 정밀 기계가공사 - 유학생(영어/베트남어) 정식 해외영업직 특별 채용 공고",
            en: "💼 Ministry of Employment K-Work: [Jobs] Precision Machinist (Sihwa Industrial Complex) - Global Sales (English/Vietnamese) Recruitment",
            vn: "💼 Bộ Lao động K-Work: [Việc làm] Công nhân gia công cơ khí chính xác Sihwa - Tuyển dụng nhân viên kinh doanh quốc tế (Anh/Việt)",
            mn: "💼 Хөдөлмөрийн яам K-Work: [Ажил] Сихва цогцолбор Нарийн машин механизмын ажилтан - Гадаад худалдааны ажилтан (Англи/Вьетнам хэл)"
          },
          date: "실시간 연동"
        },
        {
          id: 103,
          category: "gov",
          title: {
            ko: "🌐 하이코리아: [민원] 등록 외국인 대상 시간제 근로 신청 서류 온라인 간편 접수 시스템 연계 개시",
            en: "🌐 Hi Korea: [Public Service] Launch of Online Simple Submission System for Part-time Work Permit Applications for ARC Holders",
            vn: "🌐 Hi Korea: [Dịch vụ hành chính] Bắt đầu kết nối hệ thống nộp hồ sơ xin phép làm thêm trực tuyến đơn giản cho người nước ngoài",
            mn: "🌐 Hi Korea: [Цахим үйлчилгээ] Гадаад иргэдэд зориулсан цагийн ажил хийх зөвшөөрлийн хүсэлтийг цахимаар хялбар илгээх систем"
          },
          date: "실시간 연동"
        }
      ];

      setFeedItems([...syncedFeeds, ...feedItems]);
      setSyncedCount(1);
      setToast(tHome.syncSuccessToast);
    }, 1500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSyncPortals();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handlePartnerClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
    if (!confirm(`${tHome.confirmPrefix}${name}${tHome.confirmSuffix}`)) {
      e.preventDefault();
    }
  };

  const filteredFeeds = feedItems.filter(item => {
    if (activeFeedTab === "all") return true;
    return item.category === activeFeedTab;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* 0. Live Sync Status Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: "12px 20px", 
          display: "flex", 
          alignItems: "center", 
          gap: "12px", 
          background: "linear-gradient(90deg, rgba(0, 185, 242, 0.12) 0%, rgba(179, 136, 255, 0.04) 100%)",
          border: "1px solid rgba(0, 185, 242, 0.25)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
          flexDirection: "row",
          width: "100%"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span 
            className="sync-status-dot" 
            style={{ 
              width: "8px", 
              height: "8px", 
              background: "#00E5FF", 
              boxShadow: "0 0 12px #00E5FF", 
              animation: "pulseSky 2.0s infinite" 
            }}
          ></span>
        </div>
        <p style={{ 
          margin: 0, 
          fontSize: "0.85rem", 
          fontWeight: "600", 
          color: "#E0F7FA", 
          lineHeight: "1.5", 
          wordBreak: "keep-all"
        }}>
          {tHome.syncBannerText}
        </p>
      </div>

      {/* 1. Hero Dynamic Presentation Banner */}
      <section className="hero-section">
        <div className="hero-body">
          <div className="hero-subtitle">{t("heroSubtitle")}</div>
          <h1 className="hero-title" style={{ fontSize: "clamp(1.8rem, 5vw, 2.75rem)", lineHeight: "1.25", wordBreak: "keep-all" }}>
            {t("heroTitle")}
          </h1>
          <p className="hero-desc">
            {t("heroDesc")}
          </p>
          <div className="hero-buttons">
            <a href="/learning" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
              {t("heroCtaBtn")}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/intro" className="btn-secondary" style={{ whiteSpace: "nowrap" }}>{t("heroIntroBtn")}</a>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stats-card glass-panel">
            <div className="hero-stat-val">1,240+</div>
            <div className="hero-stat-label" style={{ wordBreak: "keep-all" }}>{t("statStudents")}</div>
          </div>
          <div className="hero-stats-card glass-panel">
            <div className="hero-stat-val orange">94.2%</div>
            <div className="hero-stat-label" style={{ wordBreak: "keep-all" }}>{t("statPassRate")}</div>
          </div>
          <div className="hero-stats-card glass-panel">
            <div className="hero-stat-val">F-2-R</div>
            <div className="hero-stat-label" style={{ wordBreak: "keep-all" }}>{t("statVisa")}</div>
          </div>
          <div className="hero-stats-card glass-panel">
            <div className="hero-stat-val orange">4.8 / 5.0</div>
            <div className="hero-stat-label" style={{ wordBreak: "keep-all" }}>{t("statSatisfaction")}</div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Navigation Shortcuts Grid */}
      <section>
        <div className="section-header">
          <div className="section-title">
            <span className="section-title-dot"></span>
            <h2>{tHome.quickLinksTitle}</h2>
          </div>
        </div>

        <div className="dashboard-shortcuts">
          <a href="/intro" className="shortcut-card glass-panel glass-panel-accent">
            <div className="shortcut-icon-box blue">🏢</div>
            <div className="shortcut-title">{t("scIntroTitle")}</div>
            <div className="shortcut-desc">{t("scIntroDesc")}</div>
          </a>

          <a href="/learning" className="shortcut-card glass-panel glass-panel-accent">
            <div className="shortcut-icon-box green">📚</div>
            <div className="shortcut-title">{t("scLearnTitle")}</div>
            <div className="shortcut-desc">{t("scLearnDesc")}</div>
          </a>

          <a href="/life" className="shortcut-card glass-panel glass-panel-accent">
            <div className="shortcut-icon-box orange">💼</div>
            <div className="shortcut-title">{t("scLifeTitle")}</div>
            <div className="shortcut-desc">{t("scLifeDesc")}</div>
          </a>

          <a href="/community" className="shortcut-card glass-panel glass-panel-accent">
            <div className="shortcut-icon-box yellow">👥</div>
            <div className="shortcut-title">{t("scCommTitle")}</div>
            <div className="shortcut-desc">{t("scCommDesc")}</div>
          </a>
        </div>
      </section>

      {/* 3. Comprehensive Info Feeds & Side Campaign Panels */}
      <div className="dashboard-grid">
        <section className="glass-panel" style={{ padding: "32px", overflow: "hidden" }}>
          <div className="section-header" style={{ marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            {/* Wrap container supporting wrap to completely prevent word splits and breakages on small viewports */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "16px" }}>
              <div className="section-title" style={{ minWidth: "260px", flex: "1" }}>
                <span className="section-title-dot"></span>
                <h3 style={{ fontSize: "clamp(1.15rem, 3.5vw, 1.45rem)", whiteSpace: "nowrap", letterSpacing: "-0.5px" }}>
                  {t("feedSectionTitle")}
                </h3>
              </div>
              
              {/* Dynamic Synchronization Actions (White-space Nowrap guaranteed) */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "nowrap", flexShrink: 0 }}>
                <div className="sync-status-indicator" style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
                  <span className={`sync-status-dot ${isSyncing ? "syncing" : ""}`}></span>
                  <span style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                    {isSyncing ? t("syncing") : syncedCount > 0 ? t("syncSuccess") : t("syncPending")}
                  </span>
                </div>
                
                <button 
                  onClick={handleSyncPortals}
                  disabled={isSyncing}
                  className={`btn-sync-trigger ${isSyncing ? "syncing" : ""}`}
                  style={{ whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ marginRight: "4px", transition: "transform 0.5s ease" }}
                  >
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                  {t("btnSyncTrigger")}
                </button>
              </div>
            </div>

            <div className="filter-tags" style={{ marginBottom: 0, flexWrap: "wrap" }}>
              <button 
                onClick={() => setActiveFeedTab("all")} 
                className={`filter-tag-btn ${activeFeedTab === "all" ? "active" : ""}`}
                style={{ whiteSpace: "nowrap" }}
              >
                {t("feedTabAll")}
              </button>
              <button 
                onClick={() => setActiveFeedTab("notice")} 
                className={`filter-tag-btn ${activeFeedTab === "notice" ? "active" : ""}`}
                style={{ whiteSpace: "nowrap" }}
              >
                {t("feedTabNotice")}
              </button>
              <button 
                onClick={() => setActiveFeedTab("gov")} 
                className={`filter-tag-btn ${activeFeedTab === "gov" ? "active" : ""}`}
                style={{ whiteSpace: "nowrap" }}
              >
                {t("feedTabGov")}
              </button>
              <button 
                onClick={() => setActiveFeedTab("event")} 
                className={`filter-tag-btn ${activeFeedTab === "event" ? "active" : ""}`}
                style={{ whiteSpace: "nowrap" }}
              >
                {t("feedTabEvent")}
              </button>
              <button 
                onClick={() => setActiveFeedTab("guide")} 
                className={`filter-tag-btn ${activeFeedTab === "guide" ? "active" : ""}`}
                style={{ whiteSpace: "nowrap" }}
              >
                {t("feedTabGuide")}
              </button>
            </div>
          </div>

          <div className="feed-list">
            {filteredFeeds.map(feed => {
              const displayTitle = feed.title[lang as "ko" | "en" | "vn" | "mn"] || feed.title.ko;
              let displayCategory = tHome.tagNotice;
              if (feed.category === "event") displayCategory = tHome.tagEvent;
              if (feed.category === "guide") displayCategory = tHome.tagGuide;
              if (feed.category === "gov") displayCategory = "LIVE GOV";

              return (
                <div 
                  key={feed.id} 
                  className="feed-item"
                  style={
                    feed.category === "gov" 
                      ? { border: "1px solid rgba(179, 136, 255, 0.35)", background: "rgba(147, 112, 219, 0.04)" } 
                      : {}
                  }
                >
                  <div className="feed-body">
                    <span className={`feed-tag ${feed.category}`}>
                      {displayCategory}
                    </span>
                    <div 
                      className="feed-title"
                      style={feed.category === "gov" ? { color: "#E3D8FF", fontWeight: "500" } : {}}
                    >
                      {displayTitle}
                    </div>
                  </div>
                  <div 
                    className="feed-date"
                    style={feed.category === "gov" ? { color: "#C6A3FF", fontWeight: "600" } : {}}
                  >
                    {feed.date}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Active Side Widget Card */}
        <section className="widget-banner glass-panel">
          <div className="widget-banner-icon">🎯</div>
          <div className="widget-banner-title">{tHome.widgetTitle}</div>
          <p className="widget-banner-desc">
            {tHome.widgetDesc}
          </p>
          <a href="/learning?tab=mocktest" className="widget-banner-btn">
            {tHome.widgetBtn}
          </a>
        </section>
      </div>

      {/* 4.5 Cooperation Partners Section */}
      <section className="glass-panel" style={{ padding: "32px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-color)", borderRadius: "24px" }}>
        <div className="section-header" style={{ marginBottom: "20px" }}>
          <div className="section-title">
            <span className="section-title-dot"></span>
            <h2 style={{ fontSize: "clamp(1.15rem, 3.5vw, 1.45rem)", whiteSpace: "nowrap" }}>{tHome.partnerTitle}</h2>
          </div>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.6" }}>
          {tHome.partnerDesc}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          {PARTNERS.map((partner, index) => {
            const partnerName = partner.name[lang as "ko" | "en" | "vn" | "mn"] || partner.name.ko;
            const partnerDesc = partner.description[lang as "ko" | "en" | "vn" | "mn"] || partner.description.ko;

            return (
              <a 
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handlePartnerClick(e, partnerName)}
                className="shortcut-card glass-panel"
                style={{ 
                  position: "relative",
                  display: "flex", 
                  flexDirection: "column", 
                  padding: "20px", 
                  textDecoration: "none", 
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  background: "rgba(255, 255, 255, 0.015)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = partner.color;
                  e.currentTarget.style.boxShadow = `0 8px 30px ${partner.color}1c`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Highlight strip with partner colors */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3.5px", background: partner.color }}></div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "1.75rem" }}>{partner.icon}</span>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#fff", margin: 0, letterSpacing: "-0.3px", wordBreak: "keep-all" }}>
                    {partnerName}
                  </h4>
                </div>
                
                <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.4" }}>
                  {partnerDesc}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {/* 5. Custom Sleek Glassmorphic Redirection Toast Overlay */}
      {toast && (
        <div className="toast-notification">
          <span style={{ fontSize: "1.35rem" }}>📡</span>
          <div style={{ fontSize: "0.85rem", lineHeight: "1.5", fontWeight: "500" }}>{toast}</div>
          <button className="toast-close" onClick={() => setToast(null)}>✕</button>
        </div>
      )}
    </div>
  );
}
